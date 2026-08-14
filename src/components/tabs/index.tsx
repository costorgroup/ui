import React, { forwardRef } from 'react';
import { TabsBase } from './tabs-base';
import { TTabsProps } from './types';

const Tabs = forwardRef<HTMLDivElement, TTabsProps>((props, ref) => {
  return <TabsBase ref={ref} {...props} />;
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
export { Tabs };
export default Tabs;
