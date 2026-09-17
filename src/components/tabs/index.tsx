import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { tabsClasses } from './classes';
import { TabsContext } from './context';
import { STabFade, STabIndicator, STabs, STabsList } from './styles';
import { TTabsProps } from './types';
import { useTabIndicator } from './use-tab-indicator';
import { useTabListPan } from './use-tab-list-pan';
import { useTabOverflow } from './use-tab-overflow';

const Tabs = forwardRef<HTMLDivElement, TTabsProps>(
  (
    {
      children,
      value: valueProp,
      defaultValue,
      onChange,
      orientation = 'horizontal',
      appearance = 'opaque',
      variant = 'subtle',
      fullWidth = true,
      draggable = true,
      color,
      className,
      ...props
    },
    ref,
  ) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
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
        listRef,
        value,
        {
          appearance,
          variant,
          orientation,
          fullWidth,
        },
        {
          draggable,
          onSelect: handleSelect,
        },
      );

    const { fadeStart, fadeEnd } = useTabOverflow(listRef, orientation, children);

    const { panning, onPointerDown } =
      useTabListPan(listRef, {
        orientation,
        skipTarget: (target) => {
          if (!draggable || target == null || !(target instanceof Node)) {
            return false;
          }

          const list = listRef.current;
          const selected = list?.querySelector('[role="tab"][aria-selected="true"]');

          return Boolean(selected?.contains(target));
        },
      });

    useEffect(() => {
      const list = listRef.current;

      if (list == null || value == null) {
        return;
      }

      const active = list.querySelector<HTMLElement>(
        `[role="tab"][aria-selected="true"]`,
      );
      active?.scrollIntoView({ inline: 'nearest', block: 'nearest' });
    }, [value]);

    const contextValue = useMemo(
      () => ({
        orientation,
        appearance,
        variant,
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
        variant,
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
            rootRef.current = node;

            if (typeof ref === 'function') {
              ref(node);
            } else if (ref != null) {
              ref.current = node;
            }
          }}
          orientation={orientation}
          appearance={appearance}
          variant={variant}
          fullWidth={fullWidth}
          dragging={dragging}
          role="tablist"
          aria-orientation={orientation}
          {...props}
          className={mergeClasses(
            tabsClasses.root,
            variant === 'subtle' && tabsClasses.subtle,
            variant === 'surface' && tabsClasses.surface,
            variant === 'plain' && tabsClasses.plain,
            dragging && tabsClasses.dragging,
            className,
          )}
        >
          <STabsList
            ref={listRef}
            orientation={orientation}
            panning={panning}
            className={tabsClasses.list}
            onPointerDown={onPointerDown}
          >
            <STabIndicator
              className={mergeClasses(
                tabsClasses.indicator,
                dragging && tabsClasses.indicatorDragging,
              )}
              appearance={appearance}
              variant={variant}
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
          </STabsList>
          <STabFade
            className={mergeClasses(tabsClasses.fade, tabsClasses.fadeStart)}
            side="start"
            orientation={orientation}
            appearance={appearance}
            variant={variant}
            visible={fadeStart}
            aria-hidden
          />
          <STabFade
            className={mergeClasses(tabsClasses.fade, tabsClasses.fadeEnd)}
            side="end"
            orientation={orientation}
            appearance={appearance}
            variant={variant}
            visible={fadeEnd}
            aria-hidden
          />
        </STabs>
      </TabsContext.Provider>
    );
  },
);

Tabs.displayName = 'Tabs';

export type { TTabsProps, STTabsProps, STTabIndicatorProps, STTabsFadeProps } from './types';
export type { TTabsAppearance, TTabsOrientation, TTabsVariant } from './context';
export { tabsClasses } from './classes';
export { TabsContext, useTabsContext } from './context';
export { Tab, tabClasses, type TTabProps } from './tab';
export { Tabs };
export default Tabs;
