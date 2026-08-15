import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { cardActionsClasses } from './classes';
import { SCardActions } from './styles';
import { TCardActionsProps } from './types';

const CardActions = forwardRef<HTMLDivElement, TCardActionsProps>(
  ({ children, className, justify = 'start', ...props }, ref) => {
    return (
      <SCardActions
        ref={ref}
        justify={justify}
        {...props}
        className={mergeClasses(cardActionsClasses.root, className)}
      >
        {children}
      </SCardActions>
    );
  },
);

CardActions.displayName = 'CardActions';

export type { TCardActionsProps, TCardActionsJustify } from './types';
export { cardActionsClasses } from './classes';
export { CardActions };
export default CardActions;
