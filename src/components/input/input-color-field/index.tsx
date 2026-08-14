import React, {
  KeyboardEvent,
  PointerEvent as ReactPointerEvent,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  formatColor,
  hsvToRgb,
  isAlphaFormat,
  parseColor,
  rgbToHsv,
  type TColorFormat,
  type TColorHsv,
  type TColorRgba,
} from '../../../helpers/color';
import { getDropdownPosition } from '../../../helpers/get-dropdown-position';
import type { TDropdownPlacement } from '../../../helpers/get-dropdown-position';
import { ArrowBottomIcon, EyeDropperIcon } from '../../../icons';
import { IconButton } from '../../icon-button';
import { Portal } from '../../portal';
import {
  SInputColorField,
  SInputColorFieldAlpha,
  SInputColorFieldChevron,
  SInputColorFieldControls,
  SInputColorFieldDropdown,
  SInputColorFieldHue,
  SInputColorFieldPicker,
  SInputColorFieldPlaceholder,
  SInputColorFieldPreview,
  SInputColorFieldSliderMarker,
  SInputColorFieldSliders,
  SInputColorFieldSpectrum,
  SInputColorFieldSpectrumMarker,
  SInputColorFieldSwatch,
  SInputColorFieldText,
  SInputColorFieldTrigger,
  SInputColorFieldValue,
} from './styles';
import { TInputColorFieldProps } from './types';

const DEFAULT_COLOR: TColorRgba = { r: 0, g: 0, b: 0, a: 1 };

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const InputColorField = forwardRef<HTMLDivElement, TInputColorFieldProps>(
  (
    {
      value,
      defaultValue = '#000000ff',
      onChange,
      format = 'hexa',
      placeholder = 'Select color…',
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      name,
      disabled = false,
      variant = 'subtle',
      size = 'md',
      color = 'primary',
      id,
      ...props
    },
    forwardedRef,
  ) => {
    const listId = useId();
    const isOpenControlled = openProp !== undefined;
    const isValueControlled = value !== undefined;

    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const open = isOpenControlled ? Boolean(openProp) : uncontrolledOpen;
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState<{
      top: number;
      left: number;
      width: number;
      placement: TDropdownPlacement;
    }>({
      top: 0,
      left: 0,
      width: 300,
      placement: 'bottom',
    });

    const activeFormat: TColorFormat = format;
    const showAlpha = isAlphaFormat(activeFormat);
    const initialColor = parseColor(value ?? defaultValue) ?? DEFAULT_COLOR;
    const [colorValue, setColorValue] = useState<TColorRgba>(() =>
      showAlpha ? initialColor : { ...initialColor, a: 1 },
    );
    const [hsv, setHsv] = useState<TColorHsv>(() =>
      rgbToHsv(showAlpha ? initialColor : { ...initialColor, a: 1 }),
    );

    const formatted = formatColor(colorValue, activeFormat);
    const supportsEyeDropper =
      typeof window !== 'undefined' && 'EyeDropper' in window;

    const rootRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const spectrumRef = useRef<HTMLDivElement>(null);
    const hueRef = useRef<HTMLDivElement>(null);
    const alphaRef = useRef<HTMLDivElement>(null);
    const hsvRef = useRef(hsv);
    hsvRef.current = hsv;

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node;

        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef],
    );

    const setOpen = useCallback(
      (next: boolean) => {
        if (!isOpenControlled) {
          setUncontrolledOpen(next);
        }
        onOpenChange?.(next);
      },
      [isOpenControlled, onOpenChange],
    );

    const commitFromHsv = useCallback(
      (nextHsv: TColorHsv) => {
        const normalizedHsv = showAlpha ? nextHsv : { ...nextHsv, a: 1 };
        const nextColor = hsvToRgb(
          normalizedHsv.h,
          normalizedHsv.s,
          normalizedHsv.v,
          normalizedHsv.a,
        );
        setHsv(normalizedHsv);
        setColorValue(nextColor);
        onChange?.(formatColor(nextColor, activeFormat));
      },
      [activeFormat, onChange, showAlpha],
    );

    const commitFromRgb = useCallback(
      (nextColor: TColorRgba) => {
        const normalized = showAlpha ? nextColor : { ...nextColor, a: 1 };
        setColorValue(normalized);
        setHsv(rgbToHsv(normalized));
        onChange?.(formatColor(normalized, activeFormat));
      },
      [activeFormat, onChange, showAlpha],
    );

    useEffect(() => {
      if (!isValueControlled) {
        return;
      }
      const next = parseColor(value ?? '') ?? DEFAULT_COLOR;
      const normalized = showAlpha ? next : { ...next, a: 1 };
      setColorValue(normalized);
      setHsv(rgbToHsv(normalized));
    }, [isValueControlled, showAlpha, value]);

    const updatePosition = useCallback(() => {
      const trigger = triggerRef.current;
      if (!trigger) {
        return;
      }
      const rect = trigger.getBoundingClientRect();
      const width = Math.min(300, Math.max(rect.width, 220));
      const dropdownHeight =
        dropdownRef.current?.offsetHeight ||
        Math.min(320, window.innerHeight * 0.5);

      setCoords(
        getDropdownPosition({
          trigger: rect,
          dropdownHeight,
          width,
          align: 'end',
        }),
      );
    }, []);

    useEffect(() => {
      if (!open) {
        setVisible(false);
        return;
      }

      updatePosition();
      let inner = 0;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setVisible(true));
      });

      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }, [open, updatePosition]);

    useLayoutEffect(() => {
      if (!open) {
        return;
      }

      const handleReposition = () => updatePosition();
      window.addEventListener('resize', handleReposition);
      window.addEventListener('scroll', handleReposition, true);
      const trigger = triggerRef.current;
      const dropdown = dropdownRef.current;
      const resizeObserver =
        typeof ResizeObserver !== 'undefined'
          ? new ResizeObserver(handleReposition)
          : null;
      if (trigger) {
        resizeObserver?.observe(trigger);
      }
      if (dropdown) {
        resizeObserver?.observe(dropdown);
      }

      updatePosition();

      return () => {
        window.removeEventListener('resize', handleReposition);
        window.removeEventListener('scroll', handleReposition, true);
        resizeObserver?.disconnect();
      };
    }, [open, updatePosition]);

    useEffect(() => {
      if (!open) {
        return;
      }

      const handlePointerDown = (event: MouseEvent) => {
        const target = event.target as Node;
        if (
          rootRef.current?.contains(target) ||
          dropdownRef.current?.contains(target)
        ) {
          return;
        }
        setOpen(false);
      };

      document.addEventListener('mousedown', handlePointerDown);
      return () => document.removeEventListener('mousedown', handlePointerDown);
    }, [open, setOpen]);

    const updateSpectrumFromPointer = useCallback(
      (clientX: number, clientY: number) => {
        const node = spectrumRef.current;
        if (!node) {
          return;
        }
        const rect = node.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) {
          return;
        }
        const s = clamp01((clientX - rect.left) / rect.width);
        const v = clamp01(1 - (clientY - rect.top) / rect.height);
        const current = hsvRef.current;
        commitFromHsv({ ...current, s, v });
      },
      [commitFromHsv],
    );

    const updateHueFromPointer = useCallback(
      (clientX: number) => {
        const node = hueRef.current;
        if (!node) {
          return;
        }
        const rect = node.getBoundingClientRect();
        if (rect.width <= 0) {
          return;
        }
        const h = clamp01((clientX - rect.left) / rect.width) * 360;
        const current = hsvRef.current;
        commitFromHsv({ ...current, h });
      },
      [commitFromHsv],
    );

    const updateAlphaFromPointer = useCallback(
      (clientX: number) => {
        const node = alphaRef.current;
        if (!node) {
          return;
        }
        const rect = node.getBoundingClientRect();
        if (rect.width <= 0) {
          return;
        }
        const a = clamp01((clientX - rect.left) / rect.width);
        const current = hsvRef.current;
        commitFromHsv({ ...current, a });
      },
      [commitFromHsv],
    );

    const bindDrag = (
      event: ReactPointerEvent<HTMLElement>,
      onMove: (clientX: number, clientY: number) => void,
    ) => {
      if (disabled) {
        return;
      }
      event.preventDefault();
      const target = event.currentTarget;
      target.setPointerCapture(event.pointerId);
      onMove(event.clientX, event.clientY);

      const handleMove = (moveEvent: PointerEvent) => {
        onMove(moveEvent.clientX, moveEvent.clientY);
      };
      const handleUp = (upEvent: PointerEvent) => {
        target.releasePointerCapture(upEvent.pointerId);
        target.removeEventListener('pointermove', handleMove);
        target.removeEventListener('pointerup', handleUp);
        target.removeEventListener('pointercancel', handleUp);
      };

      target.addEventListener('pointermove', handleMove);
      target.addEventListener('pointerup', handleUp);
      target.addEventListener('pointercancel', handleUp);
    };

    const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) {
        return;
      }

      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setOpen(true);
      }

      if (event.key === 'Escape' && open) {
        event.preventDefault();
        setOpen(false);
      }
    };

    const handleEyeDropper = async () => {
      if (disabled || !supportsEyeDropper) {
        return;
      }

      try {
        const EyeDropperCtor = (
          window as unknown as {
            EyeDropper: new () => { open: () => Promise<{ sRGBHex: string }> };
          }
        ).EyeDropper;
        const result = await new EyeDropperCtor().open();
        const picked = parseColor(result.sRGBHex);
        if (!picked) {
          return;
        }
        commitFromRgb({ ...picked, a: showAlpha ? colorValue.a : 1 });
      } catch {
        // User cancelled eyedropper.
      }
    };

    const opaque = formatColor({ ...colorValue, a: 1 }, 'hex');
    const swatch = formatColor(colorValue, 'rgba');
    const hueColor = `hsl(${hsv.h}, 100%, 50%)`;
    const spectrumLeft = `${hsv.s * 100}%`;
    const spectrumTop = `${(1 - hsv.v) * 100}%`;
    const hueLeft = `${(hsv.h / 360) * 100}%`;
    const alphaLeft = `${hsv.a * 100}%`;
    const hasValue = Boolean(formatted);

    return (
      <SInputColorField ref={setRefs} {...props}>
        {name != null ? (
          <input type="hidden" name={name} value={formatted} disabled={disabled} />
        ) : null}

        <SInputColorFieldTrigger
          ref={triggerRef}
          type="button"
          id={id}
          disabled={disabled}
          variant={variant}
          size={size}
          color={color}
          open={open}
          data-open={open ? 'true' : undefined}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          onClick={() => setOpen(!open)}
          onKeyDown={handleTriggerKeyDown}
          style={
            {
              ['--input-color-swatch' as string]: swatch,
            } as React.CSSProperties
          }
        >
          <SInputColorFieldValue>
            <SInputColorFieldSwatch aria-hidden />
            {hasValue ? (
              <SInputColorFieldText>{formatted}</SInputColorFieldText>
            ) : (
              <SInputColorFieldPlaceholder>
                {placeholder}
              </SInputColorFieldPlaceholder>
            )}
          </SInputColorFieldValue>
          <SInputColorFieldChevron open={open} aria-hidden>
            <ArrowBottomIcon />
          </SInputColorFieldChevron>
        </SInputColorFieldTrigger>

        {open ? (
          <Portal>
            <SInputColorFieldDropdown
              ref={dropdownRef}
              id={listId}
              role="dialog"
              aria-label="Color picker"
              top={coords.top}
              left={coords.left}
              width={coords.width}
              placement={coords.placement}
              visible={visible}
              style={
                {
                  ['--input-color-swatch' as string]: swatch,
                  ['--input-color-opaque' as string]: opaque,
                  ['--input-color-hue' as string]: hueColor,
                } as React.CSSProperties
              }
            >
              <SInputColorFieldPicker>
                <SInputColorFieldSpectrum
                  ref={spectrumRef}
                  role="slider"
                  aria-label="Saturation and brightness"
                  aria-valuetext={`Saturation ${Math.round(hsv.s * 100)}%, brightness ${Math.round(hsv.v * 100)}%`}
                  onPointerDown={(event) =>
                    bindDrag(event, updateSpectrumFromPointer)
                  }
                >
                  <SInputColorFieldSpectrumMarker
                    style={{ left: spectrumLeft, top: spectrumTop }}
                  />
                </SInputColorFieldSpectrum>

                <SInputColorFieldControls>
                  <IconButton
                    type="button"
                    variant="ghost"
                    size="sm"
                    color="default"
                    disabled={disabled || !supportsEyeDropper}
                    aria-label="Pick color from screen"
                    title={
                      supportsEyeDropper
                        ? 'Eyedropper'
                        : 'Eyedropper is not supported in this browser'
                    }
                    onClick={handleEyeDropper}
                  >
                    <EyeDropperIcon />
                  </IconButton>

                  <SInputColorFieldPreview aria-hidden />

                  <SInputColorFieldSliders>
                    <SInputColorFieldHue
                      ref={hueRef}
                      role="slider"
                      aria-label="Hue"
                      aria-valuemin={0}
                      aria-valuemax={360}
                      aria-valuenow={Math.round(hsv.h)}
                      onPointerDown={(event) =>
                        bindDrag(event, (clientX) =>
                          updateHueFromPointer(clientX),
                        )
                      }
                    >
                      <SInputColorFieldSliderMarker style={{ left: hueLeft }} />
                    </SInputColorFieldHue>

                    {showAlpha ? (
                      <SInputColorFieldAlpha
                        ref={alphaRef}
                        role="slider"
                        aria-label="Alpha"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={Math.round(colorValue.a * 100)}
                        onPointerDown={(event) =>
                          bindDrag(event, (clientX) =>
                            updateAlphaFromPointer(clientX),
                          )
                        }
                      >
                        <SInputColorFieldSliderMarker
                          style={{ left: alphaLeft, background: opaque }}
                        />
                      </SInputColorFieldAlpha>
                    ) : null}
                  </SInputColorFieldSliders>
                </SInputColorFieldControls>
              </SInputColorFieldPicker>
            </SInputColorFieldDropdown>
          </Portal>
        ) : null}
      </SInputColorField>
    );
  },
);

InputColorField.displayName = 'InputColorField';

export type { TInputColorFieldProps, TColorFormat } from './types';
export type { TColorRgba, TColorHsv } from '../../../helpers/color';
export { InputColorField };
export default InputColorField;
