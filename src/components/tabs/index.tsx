import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { tabsClasses } from './classes';
import { TabsBase } from './tabs-base';
import { TTabsProps } from './types';

const Tabs = forwardRef<HTMLDivElement, TTabsProps>(({ className, ...props }, ref) => {
  return <TabsBase ref={ref} {...props}
        className={mergeClasses(
          tabsClasses.root,
          className,
        )} />;
});

Tabs.displayName = 'Tabs';

export type {
  TTabsProps,
  TTabsVariant,
  TTabsAnchor,
  TTabsJustify,
  TTabsTextAlign,
  TTabsSize,
} from './types';
export { tabsClasses } from './classes';
export { Tabs };
export default Tabs;
