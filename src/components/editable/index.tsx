import React, {
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
import { TEditableProps } from './types';

const Editable = forwardRef<HTMLDivElement, TEditableProps>(
  (
    {
      render,
      mode = 'click',
      editable: editableProp,
      defaultEditable = false,
      disabled = false,
      className,
      onChange,
      onClick,
      onDoubleClick,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const isControlled = editableProp !== undefined;
    const [uncontrolledEditable, setUncontrolledEditable] =
      useState(defaultEditable);
    const editable = disabled ? false : isControlled ? editableProp : uncontrolledEditable;

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
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

        if (!isControlled) {
          setUncontrolledEditable(next);
        }

        onChange?.(event, next);
      },
      [disabled, editable, isControlled, onChange],
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

    const activate = (event: MouseEvent<HTMLDivElement>) => {
      if (disabled || editable) {
        return;
      }

      event.preventDefault();
      setEditable(event, true);
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
        onClick={(event) => {
          onClick?.(event);
          if (mode === 'click') {
            activate(event);
          }
        }}
        onDoubleClick={(event) => {
          onDoubleClick?.(event);
          if (mode === 'doubleclick') {
            activate(event);
          }
        }}
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
        {render(editable)}
      </SEditable>
    );
  },
);

Editable.displayName = 'Editable';

export type { TEditableProps, TEditableMode } from './types';
export { editableClasses } from './classes';
export { Editable };
export default Editable;
