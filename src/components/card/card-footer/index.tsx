import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { cardFooterClasses } from './classes';
import { SCardFooter } from './styles';
import { TCardFooterProps } from './types';

const CardFooter = forwardRef<HTMLDivElement, TCardFooterProps>(
  ({ children, variant = 'plain', className, ...props }, ref) => (
    <SCardFooter
      ref={ref}
      variant={variant}
      data-slot="card-footer"
      {...props}
      className={mergeClasses(
        cardFooterClasses.root,
        cardFooterClasses[variant],
        className,
      )}
    >
      {children}
    </SCardFooter>
  ),
);

CardFooter.displayName = 'CardFooter';

export type { TCardFooterProps, TCardFooterVariant } from './types';
export { cardFooterClasses } from './classes';
export { CardFooter };
export default CardFooter;
