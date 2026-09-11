import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { itemDescriptionClasses } from './classes';
import { SItemDescription } from './styles';
import { TItemDescriptionProps } from './types';

const ItemDescription = forwardRef<HTMLParagraphElement, TItemDescriptionProps>(
  ({ children, className, ...props }, ref) => (
    <SItemDescription
      ref={ref}
      {...props}
      className={mergeClasses(itemDescriptionClasses.root, className)}
    >
      {children}
    </SItemDescription>
  ),
);

ItemDescription.displayName = 'ItemDescription';

export type { TItemDescriptionProps } from './types';
export { itemDescriptionClasses } from './classes';
export { ItemDescription };
export default ItemDescription;
