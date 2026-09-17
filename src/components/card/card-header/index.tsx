import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { cardHeaderClasses } from './classes';
import { SCardHeader } from './styles';
import { TCardHeaderProps } from './types';

const CardHeader = forwardRef<HTMLDivElement, TCardHeaderProps>(
  ({ children, className, ...props }, ref) => (
    <SCardHeader
      ref={ref}
      data-slot="card-header"
      {...props}
      className={mergeClasses(cardHeaderClasses.root, className)}
    >
      {children}
    </SCardHeader>
  ),
);

CardHeader.displayName = 'CardHeader';

export type { TCardHeaderProps } from './types';
export { cardHeaderClasses } from './classes';
export { CardHeader };
export default CardHeader;
