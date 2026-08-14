import React, { forwardRef, useContext } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { tabBaseClasses } from './classes';
import { TabsContext } from '../../tabs/tabs-base/types';
import { STabBase } from './styles';
import { TTabBaseProps } from './types';

const TabBase = forwardRef<HTMLButtonElement, TTabBaseProps>(
  ({ children, active = false, type = 'button', className, ...props }, ref) => {
    const { variant, anchor, size, textAlign } = useContext(TabsContext);

    return (
      <STabBase
        ref={ref}
        type={type}
        role="tab"
        aria-selected={active}
        active={active}
        variant={variant}
        anchor={anchor}
        size={size}
        textAlign={textAlign}
        tabIndex={active ? 0 : -1}
        {...props}
        className={mergeClasses(
          tabBaseClasses.root,
          active && tabBaseClasses.active,
          className,
        )}
      >
        {children}
      </STabBase>
    );
  },
);

TabBase.displayName = 'TabBase';

export type { TTabBaseProps };
export { tabBaseClasses } from './classes';
export { TabBase };
export default TabBase;
