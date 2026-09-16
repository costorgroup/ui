import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { cardTitleClasses } from './classes';
import { SCardTitle } from './styles';
import { TCardTitleProps } from './types';

const CardTitle = forwardRef<HTMLHeadingElement, TCardTitleProps>(
  ({ children, className, ...props }, ref) => (
    <SCardTitle
      ref={ref}
      data-slot="card-title"
      {...props}
      className={mergeClasses(cardTitleClasses.root, className)}
    >
      {children}
    </SCardTitle>
  ),
);

CardTitle.displayName = 'CardTitle';

export type { TCardTitleProps } from './types';
export { cardTitleClasses } from './classes';
export { CardTitle };
export default CardTitle;
