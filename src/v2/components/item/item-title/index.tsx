import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { itemTitleClasses } from './classes';
import { SItemTitle } from './styles';
import { TItemTitleProps } from './types';

const ItemTitle = forwardRef<HTMLHeadingElement, TItemTitleProps>(
  ({ children, className, ...props }, ref) => (
    <SItemTitle
      ref={ref}
      {...props}
      className={mergeClasses(itemTitleClasses.root, className)}
    >
      {children}
    </SItemTitle>
  ),
);

ItemTitle.displayName = 'ItemTitle';

export type { TItemTitleProps } from './types';
export { itemTitleClasses } from './classes';
export { ItemTitle };
export default ItemTitle;
