import React, {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { editableClasses } from './classes';
import { SEditable } from './styles';
import { TEditableHandlers, TEditableProps } from './types';

const Editable = forwardRef<HTMLSpanElement, TEditableProps>(
  (
    {
      render,
      mode = 'click',
      value: valueProp,
      defaultValue = '',
      onChange,
      editable: editableProp,
      defaultEditable = false,
      disabled = false,
      onEditableChange,
      className,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const rootRef = useRef<HTMLSpanElement | null>(null);

    const isEditableControlled = editableProp !== undefined;
    const [uncontrolledEditable, setUncontrolledEditable] = useState(defaultEditable);
    const editable = disabled
      ? false
      : isEditableControlled
        ? editableProp
        : uncontrolledEditable;

    const isValueControlled = valueProp !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const value = isValueControlled ? valueProp : uncontrolledValue;

    const setRefs = useCallback(
      (node: HTMLSpanElement | null) => {
        rootRef.current = node;

        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    const setEditable = useCallback(
      (event: MouseEvent | KeyboardEvent | Event, next: boolean) => {
        if (disabled || next === editable) {
          return;
        }

        if (!isEditableControlled) {
          setUncontrolledEditable(next);
        }

        onEditableChange?.(event, next);
      },
      [disabled, editable, isEditableControlled, onEditableChange],
    );

    const handleValueChange = useCallback(
      (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!isValueControlled) {
          setUncontrolledValue(event.target.value);
        }

        onChange?.(event);
      },
      [isValueControlled, onChange],
    );

    useEffect(() => {
      if (!editable) {
        return;
      }

      const root = rootRef.current;
      const focusable = root?.querySelector<HTMLElement>(
        'input, textarea, select, [contenteditable="true"]',
      );

      focusable?.focus();
      if (focusable instanceof HTMLInputElement || focusable instanceof HTMLTextAreaElement) {
        const length = focusable.value.length;
        focusable.setSelectionRange?.(length, length);
      }
    }, [editable]);

    useEffect(() => {
      if (!editable) {
        return;
      }

      const onPointerDown = (event: PointerEvent) => {
        if (rootRef.current?.contains(event.target as Node)) {
          return;
        }

        setEditable(event, false);
      };

      document.addEventListener('pointerdown', onPointerDown);

      return () => {
        document.removeEventListener('pointerdown', onPointerDown);
      };
    }, [editable, setEditable]);

    const activate = (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
      if (disabled || editable) {
        return;
      }

      event.preventDefault();
      setEditable(event, true);
    };

    const handlers: TEditableHandlers = {
      ...(mode === 'double-click' ? { onDoubleClick: activate } : { onClick: activate }),
      onKeyDown: (event) => {
        if (disabled || editable || event.defaultPrevented) {
          return;
        }

        if (event.key === 'Enter' || event.key === ' ') {
          activate(event);
        }
      },
      tabIndex: disabled ? -1 : 0,
      role: 'button',
      ...(disabled ? { 'aria-disabled': true as const } : {}),
    };

    return (
      <SEditable
        {...props}
        ref={setRefs}
        data-editable={editable ? 'true' : undefined}
        data-disabled={disabled ? 'true' : undefined}
        className={mergeClasses(
          editableClasses.root,
          disabled && editableClasses.disabled,
          className,
        )}
        onKeyDown={(event) => {
          onKeyDown?.(event);

          if (!editable || event.defaultPrevented) {
            return;
          }

          if (event.key === 'Escape') {
            event.preventDefault();
            setEditable(event, false);
            return;
          }

          if (event.key !== 'Enter' || event.nativeEvent.isComposing) {
            return;
          }

          const target = event.target as HTMLElement;

          if (target instanceof HTMLTextAreaElement || target.isContentEditable) {
            return;
          }

          event.preventDefault();
          setEditable(event, false);
        }}
      >
        {render({ editable, value, onChange: handleValueChange, handlers })}
      </SEditable>
    );
  },
);

Editable.displayName = 'Editable';

export type {
  TEditableProps,
  TEditableMode,
  TEditableRenderProps,
  TEditableHandlers,
  TEditableChangeEventHandler,
} from './types';
export { editableClasses } from './classes';
export { Editable };
export default Editable;
