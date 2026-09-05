import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { useTabsContext } from '../context';
import { tabClasses } from './classes';
import { STab } from './styles';
import { TTabProps } from './types';

const Tab = forwardRef<HTMLButtonElement, TTabProps>(
  (
    {
      value,
      children,
      disabled = false,
      className,
      onClick,
      ...props
    },
    ref,
  ) => {
    const {
      orientation,
      appearance,
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
    const tabRef = useRef<HTMLButtonElement>(null);
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
    }, [registerTab, value, appearance, orientation, fullWidth]);

    return (
      <STab
        ref={(node) => {
          tabRef.current = node;

          if (typeof ref === 'function') {
            ref(node);
          } else if (ref != null) {
            ref.current = node;
          }

          registerTab(value, node);
        }}
        type="button"
        role="tab"
        aria-selected={active}
        data-active={active ? 'true' : undefined}
        {...props}
        active={active}
        appearance={appearance}
        orientation={orientation}
        fullWidth={fullWidth}
        disabled={disabled}
        draggable={draggable}
        dragging={dragging}
        selected={isSelected}
        color={color}
        onPointerDown={(event) => {
          if (
            draggable &&
            !disabled &&
            event.button === 0 &&
            isSelected
          ) {
            startIndicatorDrag(event.clientX, event.clientY);
          }
        }}
        onClick={(event) => {
          onClick?.(event);

          if (!event.defaultPrevented && !disabled) {
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
  },
);

Tab.displayName = 'Tab';

export type { TTabProps };
export { tabClasses } from './classes';
export { Tab };
export default Tab;
