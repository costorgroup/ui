import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { cardActionClasses } from './classes';
import { SCardAction } from './styles';
import { TCardActionProps } from './types';

const CardAction = forwardRef<HTMLDivElement, TCardActionProps>(
  ({ children, className, ...props }, ref) => (
    <SCardAction
      ref={ref}
      data-slot="card-action"
      {...props}
      className={mergeClasses(cardActionClasses.root, className)}
    >
      {children}
    </SCardAction>
  ),
);

CardAction.displayName = 'CardAction';

export type { TCardActionProps } from './types';
export { cardActionClasses } from './classes';
export { CardAction };
export default CardAction;
