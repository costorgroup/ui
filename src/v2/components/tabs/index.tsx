import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { tabsClasses } from './classes';
import { TabsContext } from './context';
import { STabIndicator, STabs } from './styles';
import { TTabsProps } from './types';
import { useTabIndicator } from './use-tab-indicator';

const Tabs = forwardRef<HTMLDivElement, TTabsProps>(
  (
    {
      children,
      value: valueProp,
      defaultValue,
      onChange,
      orientation = 'horizontal',
      appearance = 'solid',
      fullWidth = true,
      draggable = true,
      color,
      className,
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const value = valueProp ?? uncontrolledValue;

    const handleSelect = useCallback(
      (next: string) => {
        if (valueProp === undefined) {
          setUncontrolledValue(next);
        }

        onChange?.(next);
      },
      [onChange, valueProp],
    );

    const { indicator, registerTab, ready, dragging, dragHoverValue, startIndicatorDrag } =
      useTabIndicator(
        containerRef,
        value,
        {
          appearance,
          orientation,
          fullWidth,
        },
        {
          draggable,
          onSelect: handleSelect,
        },
      );

    const contextValue = useMemo(
      () => ({
        orientation,
        appearance,
        fullWidth,
        draggable,
        dragging,
        dragHoverValue,
        color,
        value,
        onSelect: handleSelect,
        registerTab,
        startIndicatorDrag,
      }),
      [
        orientation,
        appearance,
        fullWidth,
        draggable,
        dragging,
        dragHoverValue,
        color,
        value,
        handleSelect,
        registerTab,
        startIndicatorDrag,
      ],
    );

    return (
      <TabsContext.Provider value={contextValue}>
        <STabs
          ref={(node) => {
            containerRef.current = node;

            if (typeof ref === 'function') {
              ref(node);
            } else if (ref != null) {
              ref.current = node;
            }
          }}
          orientation={orientation}
          appearance={appearance}
          fullWidth={fullWidth}
          dragging={dragging}
          color={color}
          role="tablist"
          aria-orientation={orientation}
          {...props}
          className={mergeClasses(
            tabsClasses.root,
            dragging && tabsClasses.dragging,
            className,
          )}
        >
          <STabIndicator
            className={mergeClasses(
              tabsClasses.indicator,
              dragging && tabsClasses.indicatorDragging,
            )}
            appearance={appearance}
            color={color}
            width={indicator.width}
            height={indicator.height}
            x={indicator.x}
            y={indicator.y}
            ready={ready}
            dragging={dragging}
            aria-hidden
          />
          {children}
        </STabs>
      </TabsContext.Provider>
    );
  },
);

Tabs.displayName = 'Tabs';

export type { TTabsProps, STTabsProps, STTabIndicatorProps } from './types';
export type { TTabsAppearance, TTabsOrientation } from './context';
export { tabsClasses } from './classes';
export { TabsContext, useTabsContext } from './context';
export { Tab, tabClasses, type TTabProps } from './tab';
export { Tabs };
export default Tabs;
