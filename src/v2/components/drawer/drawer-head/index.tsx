import React, { Children, forwardRef, isValidElement, ReactNode } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { drawerHeadClasses } from './classes';
import { SDrawerHead, SDrawerHeadMain } from './styles';
import { TDrawerHeadProps } from './types';

const isHeadActions = (child: ReactNode) =>
  isValidElement(child) &&
  typeof child.type !== 'string' &&
  (child.type as { displayName?: string }).displayName === 'DrawerHeadActions';

const DrawerHead = forwardRef<HTMLDivElement, TDrawerHeadProps>(
  ({ children, className, ...props }, ref) => {
    const nodes = Children.toArray(children);
    const actions = nodes.filter(isHeadActions);
    const rest = nodes.filter((child) => !isHeadActions(child));

    return (
      <SDrawerHead
        ref={ref}
        {...props}
        className={mergeClasses(drawerHeadClasses.root, className)}
      >
        {rest.length > 0 ? (
          <SDrawerHeadMain className={drawerHeadClasses.main}>
            {rest}
          </SDrawerHeadMain>
        ) : null}
        {actions}
      </SDrawerHead>
    );
  },
);

DrawerHead.displayName = 'DrawerHead';

export type { TDrawerHeadProps };
export { drawerHeadClasses } from './classes';
export { DrawerHead };
export default DrawerHead;
