import React, {
  ElementType,
  HTMLAttributes,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import type { TPolymorphicComponent } from '../../../helpers/polymorphic';
import { useTabsContext } from '../context';
import { tabClasses } from './classes';
import { STab } from './styles';
import { TTabOwnProps, TTabProps } from './types';

// Concrete props for the render function — `TTabProps<ElementType>` carries an
// index signature that makes forwardRef drop the required `value`. Callers are
// typed per `as` through the TPolymorphicComponent cast below.
type TTabRenderProps = TTabOwnProps &
  Omit<HTMLAttributes<HTMLElement>, keyof TTabOwnProps> & {
    as?: ElementType;
  };

const Tab = forwardRef(function Tab(
  {
    as,
    value,
    children,
    disabled = false,
    className,
    onClick,
    onDragStart,
    ...props
  }: TTabRenderProps,
  ref: React.Ref<Element>,
) {
  const {
    orientation,
    appearance,
    variant,
    fullWidth,
    draggable,
    dragging,
    dragHoverValue,
    color,
    value: selectedValue,
    onSelect,
    registerTab,
    startIndicatorDrag,
  } = useTabsContext();
  const tabRef = useRef<HTMLElement>(null);
  const tag = as ?? 'button';
  const isButton = tag === 'button';
  const isSelected = selectedValue === value;
  const active = dragging ? dragHoverValue === value : isSelected;

  useEffect(() => {
    registerTab(value, tabRef.current);

    return () => registerTab(value, null);
  }, [registerTab, value]);

  useLayoutEffect(() => {
    if (tabRef.current != null) {
      registerTab(value, tabRef.current);
    }
  }, [registerTab, value, appearance, variant, orientation, fullWidth]);

  return (
    <STab
      as={tag}
      ref={(node: HTMLElement | null) => {
        tabRef.current = node;

        if (typeof ref === 'function') {
          ref(node);
        } else if (ref != null) {
          (ref as React.MutableRefObject<Element | null>).current = node;
        }

        registerTab(value, node);
      }}
      type={isButton ? 'button' : undefined}
      role="tab"
      aria-selected={active}
      aria-current={!isButton && isSelected ? 'page' : undefined}
      aria-disabled={!isButton && disabled ? true : undefined}
      tabIndex={!isButton && disabled ? -1 : undefined}
      data-active={active ? 'true' : undefined}
      {...props}
      active={active}
      appearance={appearance}
      variant={variant}
      orientation={orientation}
      fullWidth={fullWidth}
      disabled={isButton ? disabled : undefined}
      draggable={draggable}
      dragging={dragging}
      selected={isSelected}
      color={color}
      onPointerDown={(event: React.PointerEvent<HTMLElement>) => {
        if (draggable && !disabled && event.button === 0 && isSelected) {
          startIndicatorDrag(event.clientX, event.clientY);
        }
      }}
      onDragStart={(event: React.DragEvent<HTMLElement>) => {
        onDragStart?.(event);
        // Links are natively draggable, which would hijack indicator drag
        // and list panning with a ghost image.
        event.preventDefault();
      }}
      onClick={(event: React.MouseEvent<HTMLElement>) => {
        if (disabled) {
          event.preventDefault();
          return;
        }

        onClick?.(event);

        // Modified clicks on links open a new tab/window — the current
        // page (and its selected tab) stays.
        const modified =
          !isButton &&
          (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey);

        if (!event.defaultPrevented && !modified) {
          onSelect(value);
        }
      }}
      className={mergeClasses(
        tabClasses.root,
        active && tabClasses.active,
        draggable && isSelected && tabClasses.draggable,
        className,
      )}
    >
      {children}
    </STab>
  );
}) as TPolymorphicComponent<'button', TTabOwnProps>;

Tab.displayName = 'Tab';

export type { TTabProps, TTabOwnProps };
export { tabClasses } from './classes';
export { Tab };
export default Tab;
