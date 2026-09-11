import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { itemContentClasses } from './classes';
import { SItemContent } from './styles';
import { TItemContentProps } from './types';

const ItemContent = forwardRef<HTMLDivElement, TItemContentProps>(
  ({ children, className, ...props }, ref) => (
    <SItemContent
      ref={ref}
      {...props}
      className={mergeClasses(itemContentClasses.root, className)}
    >
      {children}
    </SItemContent>
  ),
);

ItemContent.displayName = 'ItemContent';

export type { TItemContentProps } from './types';
export { itemContentClasses } from './classes';
export { ItemContent };
export default ItemContent;
