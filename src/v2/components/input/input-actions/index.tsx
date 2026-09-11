import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { inputActionsClasses } from './classes';
import { SInputActions } from './styles';
import { TInputActionsProps } from './types';

const InputActions = forwardRef<HTMLDivElement, TInputActionsProps>(
  (
    { children, orientation = 'horizontal', className, ...props },
    ref,
  ) => {
    return (
      <SInputActions
        ref={ref}
        orientation={orientation}
        {...props}
        className={mergeClasses(
          inputActionsClasses.root,
          orientation === 'vertical'
            ? inputActionsClasses.vertical
            : inputActionsClasses.horizontal,
          className,
        )}
      >
        {children}
      </SInputActions>
    );
  },
);

InputActions.displayName = 'InputActions';

export type { TInputActionsProps, TInputActionsOrientation } from './types';
export { INPUT_ACTIONS_ORIENTATIONS } from './types';
export { inputActionsClasses } from './classes';
export { InputActions };
export default InputActions;
