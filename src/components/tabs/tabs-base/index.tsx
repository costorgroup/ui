import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { tabsBaseClasses } from './classes';
import { STabsBase } from './styles';
import { TabsContext, TTabsBaseProps } from './types';

const TabsBase = forwardRef<HTMLDivElement, TTabsBaseProps>(
  (
    {
      children,
      color = 'primary',
      variant = 'line',
      anchor = 'bottom',
      justify = 'stretch',
      textAlign = 'center',
      size = 'md',
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <TabsContext.Provider value={{ color, variant, anchor, size, textAlign }}>
        <STabsBase
          ref={ref}
          color={color}
          variant={variant}
          anchor={anchor}
          justify={justify}
          role="tablist"
          aria-orientation={
            anchor === 'left' || anchor === 'right' ? 'vertical' : 'horizontal'
          }
          {...props}
        className={mergeClasses(
          tabsBaseClasses.root,
          className,
        )}
        >
          {children}
        </STabsBase>
      </TabsContext.Provider>
    );
  },
);

TabsBase.displayName = 'TabsBase';

export type {
  TTabsBaseProps,
  TTabsVariant,
  TTabsAnchor,
  TTabsJustify,
  TTabsTextAlign,
  TTabsSize,
  TTabsContextValue,
} from './types';
export { TabsContext } from './types';
export { tabsBaseClasses } from './classes';
export { TabsBase };
export default TabsBase;
