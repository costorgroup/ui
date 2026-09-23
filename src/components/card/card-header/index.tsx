import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { cardHeaderClasses } from './classes';
import { SCardHeader } from './styles';
import { TCardHeaderProps } from './types';

const CardHeader = forwardRef<HTMLDivElement, TCardHeaderProps>(
  ({ children, variant = 'plain', className, ...props }, ref) => (
    <SCardHeader
      ref={ref}
      variant={variant}
      data-slot="card-header"
      {...props}
      className={mergeClasses(
        cardHeaderClasses.root,
        cardHeaderClasses[variant],
        className,
      )}
    >
      {children}
    </SCardHeader>
  ),
);

CardHeader.displayName = 'CardHeader';

export type { TCardHeaderProps, TCardHeaderVariant } from './types';
export { cardHeaderClasses } from './classes';
export { CardHeader };
export default CardHeader;
