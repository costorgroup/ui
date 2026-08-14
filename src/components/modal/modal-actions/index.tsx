import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { modalActionsClasses } from './classes';
import { SModalActions } from './styles';
import { TModalActionsProps } from './types';

const ModalActions = forwardRef<HTMLDivElement, TModalActionsProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SModalActions ref={ref} {...props}
        className={mergeClasses(
          modalActionsClasses.root,
          className,
        )}>
        {children}
      </SModalActions>
    );
  },
);

ModalActions.displayName = 'ModalActions';

export type { TModalActionsProps };
export { modalActionsClasses } from './classes';
export { ModalActions };
export default ModalActions;
