import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { cardDescriptionClasses } from './classes';
import { SCardDescription } from './styles';
import { TCardDescriptionProps } from './types';

const CardDescription = forwardRef<HTMLParagraphElement, TCardDescriptionProps>(
  ({ children, className, ...props }, ref) => (
    <SCardDescription
      ref={ref}
      data-slot="card-description"
      {...props}
      className={mergeClasses(cardDescriptionClasses.root, className)}
    >
      {children}
    </SCardDescription>
  ),
);

CardDescription.displayName = 'CardDescription';

export type { TCardDescriptionProps } from './types';
export { cardDescriptionClasses } from './classes';
export { CardDescription };
export default CardDescription;
