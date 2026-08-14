import React, {
  ChangeEvent,
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { inputRangeFieldClasses } from './classes';
import {
  SInputRangeField,
  SInputRangeFieldInput,
  SInputRangeFieldRail,
  SInputRangeFieldThumb,
  SInputRangeFieldTooltip,
  SInputRangeFieldTrack,
  SInputRangeFieldValue,
  rangeSizeMap,
} from './styles';
import {
  TInputRangeFieldProps,
  TRangeDirection,
  TRangeThumb,
  TRangeValue,
} from './types';

const toNumber = (value: unknown, fallback: number) => {
  const parsed = typeof value === 'number' ? value : Number(value);

  return Number.isFinite(parsed) ? parsed : fallback;
};

const countDecimals = (value: number) => {
  if (!Number.isFinite(value)) {
    return 0;
  }

  const text = String(value);

  if (text.includes('e-')) {
    const [base = '', exp = '0'] = text.split('e-');
    const baseDecimals = base.split('.')[1]?.length ?? 0;

    return baseDecimals + Number(exp);
  }

  const index = text.indexOf('.');

  return index === -1 ? 0 : text.length - index - 1;
};

const formatValue = (value: number, step: number) => {
  const decimals = countDecimals(step);

  return decimals === 0 ? String(Math.round(value)) : value.toFixed(decimals);
};

const toPercent = (value: number, min: number, max: number) => {
  const span = max - min;

  if (span === 0) {
    return 0;
  }

  return Math.min(100, Math.max(0, ((value - min) / span) * 100));
};

const parsePair = (
  value: TRangeValue | undefined,
  min: number,
  max: number,
): [number, number] => {
  if (Array.isArray(value)) {
    const from = toNumber(value[0], min);
    const to = toNumber(value[1], max);

    return from <= to ? [from, to] : [to, from];
  }

  if (value != null) {
    const current = toNumber(value, min);

    return [min, current];
  }

  const span = max - min;

  return [min + span * 0.25, min + span * 0.75];
};

const snapValue = (value: number, min: number, max: number, step: number) => {
  if (step <= 0) {
    return Math.min(max, Math.max(min, value));
  }

  const next = min + Math.round((value - min) / step) * step;
  const decimals = countDecimals(step);
  const rounded =
    decimals === 0 ? next : Number(next.toFixed(decimals));

  return Math.min(max, Math.max(min, rounded));
};

const thumbCenter = (
  percent: number,
  rect: DOMRect,
  direction: TRangeDirection,
) => {
  if (direction === 'vertical') {
    return {
      x: rect.left + rect.width / 2,
      y: rect.bottom - (percent / 100) * rect.height,
    };
  }

  return {
    x: rect.left + (percent / 100) * rect.width,
    y: rect.top + rect.height / 2,
  };
};

const percentFromPointer = (
  clientX: number,
  clientY: number,
  grabX: number,
  grabY: number,
  rect: DOMRect,
  direction: TRangeDirection,
) => {
  if (direction === 'vertical') {
    const y = clientY - grabY;
    const span = rect.height;

    if (span === 0) {
      return 0;
    }

    return Math.min(100, Math.max(0, ((rect.bottom - y) / span) * 100));
  }

  const x = clientX - grabX;
  const span = rect.width;

  if (span === 0) {
    return 0;
  }

  return Math.min(100, Math.max(0, ((x - rect.left) / span) * 100));
};

type TThumbState = {
  key: TRangeThumb;
  value: number;
  percent: number;
};

type TDragState = {
  key: TRangeThumb;
  grabX: number;
  grabY: number;
};

const InputRangeField = forwardRef<HTMLInputElement, TInputRangeFieldProps>(
  (
    {
      size = 'md',
      variant = 'subtle',
      color = 'primary',
      multi = false,
      direction = 'horizontal',
      valuePosition: valuePositionProp,
      renderValue,
      track = 'normal',
      min = 0,
      max = 100,
      step = 1,
      value,
      defaultValue,
      disabled,
      name,
      id,
      onChange,
      onPointerDown,
      onPointerUp,
      className,
      ...props
    },
    ref,
  ) => {
    const rootRef = useRef<HTMLSpanElement>(null);
    const inputRefs = useRef<Partial<Record<TRangeThumb, HTMLInputElement | null>>>(
      {},
    );
    const dragRef = useRef<TDragState | null>(null);
    const minAmount = toNumber(min, 0);
    const maxAmount = toNumber(max, 100);
    const stepAmount = toNumber(step, 1);
    const valuePosition =
      valuePositionProp ?? (direction === 'vertical' ? 'right' : 'top');
    const isControlled = value !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState<TRangeValue>(
      () =>
        multi
          ? parsePair(defaultValue, minAmount, maxAmount)
          : toNumber(defaultValue, minAmount),
    );
    const [hoveredThumb, setHoveredThumb] = useState<TRangeThumb | null>(null);
    const [draggingThumb, setDraggingThumb] = useState<TRangeThumb | null>(
      null,
    );
    const [activeThumb, setActiveThumb] = useState<'from' | 'to'>('to');
    const current = isControlled ? value : uncontrolledValue;
    const thumbSize = rangeSizeMap[size].thumb;
    const hitRadius = Math.max(thumbSize / 2, 21);

    const thumbs: TThumbState[] = multi
      ? (() => {
          const [from, to] = parsePair(current, minAmount, maxAmount);

          return [
            {
              key: 'from',
              value: from,
              percent: toPercent(from, minAmount, maxAmount),
            },
            {
              key: 'to',
              value: to,
              percent: toPercent(to, minAmount, maxAmount),
            },
          ];
        })()
      : [
          {
            key: 'single',
            value: toNumber(current, minAmount),
            percent: toPercent(
              toNumber(current, minAmount),
              minAmount,
              maxAmount,
            ),
          },
        ];

    const from = thumbs[0].value;
    const to = multi ? thumbs[1].value : thumbs[0].value;

    const hitThumb = useCallback(
      (clientX: number, clientY: number) => {
        const root = rootRef.current;

        if (!root) {
          return null;
        }

        const rect = root.getBoundingClientRect();
        const hits = thumbs.filter((thumb) => {
          const center = thumbCenter(thumb.percent, rect, direction);

          return Math.hypot(clientX - center.x, clientY - center.y) <= hitRadius;
        });

        if (hits.length === 0) {
          return null;
        }

        if (hits.length === 1) {
          return hits[0].key;
        }

        return activeThumb === 'from' ? 'from' : 'to';
      },
      [activeThumb, direction, hitRadius, thumbs],
    );

    const closestThumb = (percent: number): TRangeThumb => {
      if (!multi) {
        return 'single';
      }

      const dFrom = Math.abs(thumbs[0].percent - percent);
      const dTo = Math.abs(thumbs[1].percent - percent);

      return dFrom <= dTo ? 'from' : 'to';
    };

    useEffect(() => {
      const inputs = rootRef.current?.querySelectorAll('input[type="range"]');

      inputs?.forEach((input) => {
        if (direction === 'vertical') {
          input.setAttribute('orient', 'vertical');
        } else {
          input.removeAttribute('orient');
        }
      });
    }, [direction, multi]);

    const emit = (event: ChangeEvent<HTMLInputElement>, next: TRangeValue) => {
      if (!isControlled) {
        setUncontrolledValue(next);
      }

      onChange?.(event, next);
    };

    const emitFromPointer = (
      event: ReactPointerEvent<HTMLSpanElement>,
      key: TRangeThumb,
      next: TRangeValue,
    ) => {
      const input = inputRefs.current[key];
      const raw = Array.isArray(next)
        ? key === 'from'
          ? next[0]
          : next[1]
        : next;

      if (input) {
        input.value = String(raw);
      }

      emit(
        {
          ...event,
          target: input ?? event.target,
          currentTarget: input ?? event.currentTarget,
        } as unknown as ChangeEvent<HTMLInputElement>,
        next,
      );
    };

    const valueFromPointer = (
      clientX: number,
      clientY: number,
      grabX: number,
      grabY: number,
    ) => {
      const root = rootRef.current;

      if (!root) {
        return 0;
      }

      const percent = percentFromPointer(
        clientX,
        clientY,
        grabX,
        grabY,
        root.getBoundingClientRect(),
        direction,
      );
      const unclamped =
        minAmount + (percent / 100) * (maxAmount - minAmount);

      return snapValue(unclamped, minAmount, maxAmount, stepAmount);
    };

    const applyDrag = (
      event: ReactPointerEvent<HTMLSpanElement>,
      key: TRangeThumb,
      grabX: number,
      grabY: number,
    ) => {
      let nextValue = valueFromPointer(
        event.clientX,
        event.clientY,
        grabX,
        grabY,
      );

      if (multi) {
        if (key === 'from') {
          nextValue = Math.min(nextValue, to);
          emitFromPointer(event, key, [nextValue, to]);
          return;
        }

        nextValue = Math.max(nextValue, from);
        emitFromPointer(event, key, [from, nextValue]);
        return;
      }

      emitFromPointer(event, key, nextValue);
    };

    const handlePointerDown = (event: ReactPointerEvent<HTMLSpanElement>) => {
      if (disabled || event.button !== 0) {
        onPointerDown?.(event as unknown as ReactPointerEvent<HTMLInputElement>);
        return;
      }

      const root = rootRef.current;

      if (!root) {
        return;
      }

      const rect = root.getBoundingClientRect();
      const hit = hitThumb(event.clientX, event.clientY);
      const percent = percentFromPointer(
        event.clientX,
        event.clientY,
        0,
        0,
        rect,
        direction,
      );
      const key = hit ?? closestThumb(percent);
      const center = thumbCenter(
        thumbs.find((thumb) => thumb.key === key)?.percent ?? percent,
        rect,
        direction,
      );
      const grabX = hit ? event.clientX - center.x : 0;
      const grabY = hit ? event.clientY - center.y : 0;

      dragRef.current = { key, grabX, grabY };
      setDraggingThumb(key);

      if (key === 'from' || key === 'to') {
        setActiveThumb(key);
      }

      inputRefs.current[key]?.focus();
      root.setPointerCapture(event.pointerId);

      if (!hit) {
        applyDrag(event, key, 0, 0);
      }

      onPointerDown?.(event as unknown as ReactPointerEvent<HTMLInputElement>);
    };

    const handlePointerMove = (event: ReactPointerEvent<HTMLSpanElement>) => {
      const drag = dragRef.current;

      if (drag) {
        applyDrag(event, drag.key, drag.grabX, drag.grabY);
        return;
      }

      setHoveredThumb(hitThumb(event.clientX, event.clientY));
    };

    const handlePointerUp = (event: ReactPointerEvent<HTMLSpanElement>) => {
      dragRef.current = null;
      setDraggingThumb(null);
      setHoveredThumb(hitThumb(event.clientX, event.clientY));
      onPointerUp?.(event as unknown as ReactPointerEvent<HTMLInputElement>);
    };

    const fillSpan = (
      fromPct: number,
      toPct: number,
    ): CSSProperties =>
      direction === 'vertical'
        ? { bottom: `${fromPct}%`, height: `${toPct - fromPct}%` }
        : { left: `${fromPct}%`, width: `${toPct - fromPct}%` };

    const startPct = multi ? thumbs[0].percent : 0;
    const endPct = multi ? thumbs[1].percent : thumbs[0].percent;
    const fillStyles: CSSProperties[] =
      track === false
        ? []
        : track === 'inverted'
          ? multi
            ? [fillSpan(0, startPct), fillSpan(endPct, 100)]
            : [fillSpan(endPct, 100)]
          : [fillSpan(startPct, endPct)];

    const bindInput = (thumb: TThumbState, node: HTMLInputElement | null) => {
      inputRefs.current[thumb.key] = node;

      if (thumb.key === 'to') {
        return;
      }

      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const renderInput = (thumb: TThumbState, inputValue: number) => (
      <SInputRangeFieldInput
        key={`input-${thumb.key}`}
        ref={(node) => bindInput(thumb, node)}
        {...props}
        id={thumb.key === 'to' && id ? `${id}-to` : id}
        name={name && thumb.key !== 'single' ? `${name}-${thumb.key}` : name}
        type="range"
        min={minAmount}
        max={maxAmount}
        step={stepAmount}
        value={inputValue}
        disabled={disabled}
        aria-label={
          thumb.key === 'single'
            ? undefined
            : thumb.key === 'from'
              ? 'From'
              : 'To'
        }
        onChange={(event) => {
          const next = toNumber(event.target.value, inputValue);

          if (multi) {
            emit(
              event,
              thumb.key === 'from'
                ? [Math.min(next, to), to]
                : [from, Math.max(next, from)],
            );
            return;
          }

          emit(event, next);
        }}
      />
    );

    return (
      <SInputRangeField
        ref={rootRef}
        size={size}
        variant={variant}
        color={color}
        direction={direction}
        track={track}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={() => {
          if (!dragRef.current) {
            setHoveredThumb(null);
          }
        }}
      >
        <SInputRangeFieldRail direction={direction} 
        className={mergeClasses(
          inputRangeFieldClasses.root,
          className,
        )}
      />
        {fillStyles.map((style, index) => (
          <SInputRangeFieldTrack
            key={index}
            direction={direction}
            style={style}
          />
        ))}
        {thumbs.map((thumb) => {
          const visible =
            hoveredThumb === thumb.key || draggingThumb === thumb.key;
          const formatted = formatValue(thumb.value, stepAmount);
          const thumbStyle: CSSProperties = {
            zIndex: draggingThumb === thumb.key || activeThumb === thumb.key ? 2 : 1,
            ...(direction === 'vertical'
              ? { bottom: `${thumb.percent}%` }
              : { left: `${thumb.percent}%` }),
          };

          return (
            <SInputRangeFieldThumb
              key={thumb.key}
              data-range-thumb=""
              data-active={visible}
              direction={direction}
              style={thumbStyle}
            >
              <SInputRangeFieldTooltip
                visible={visible}
                position={valuePosition}
              >
                {renderValue?.({
                  value: thumb.value,
                  thumb: thumb.key,
                  formatted,
                }) ?? <SInputRangeFieldValue>{formatted}</SInputRangeFieldValue>}
              </SInputRangeFieldTooltip>
            </SInputRangeFieldThumb>
          );
        })}
        {thumbs.map((thumb) => renderInput(thumb, thumb.value))}
      </SInputRangeField>
    );
  },
);

InputRangeField.displayName = 'InputRangeField';

export type {
  TInputRangeFieldProps,
  TRangeDirection,
  TRangeRenderValue,
  TRangeRenderValueProps,
  TRangeThumb,
  TRangeTrack,
  TRangeValue,
  TRangeValuePosition,
} from './types';
export { inputRangeFieldClasses } from './classes';
export { InputRangeField };
export default InputRangeField;
