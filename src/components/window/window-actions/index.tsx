import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { windowActionsClasses } from './classes';
import { SWindowActions } from './styles';
import { TWindowActionsProps } from './types';

const WindowActions = forwardRef<HTMLDivElement, TWindowActionsProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SWindowActions
        ref={ref}
        {...props}
        className={mergeClasses(windowActionsClasses.root, className)}
      >
        {children}
      </SWindowActions>
    );
  },
);

WindowActions.displayName = 'WindowActions';

export type { TWindowActionsProps };
export { windowActionsClasses } from './classes';
export { WindowActions };
export default WindowActions;
