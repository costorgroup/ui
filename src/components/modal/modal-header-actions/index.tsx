import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { modalHeaderActionsClasses } from './classes';
import { SModalHeaderActions } from './styles';
import { TModalHeaderActionsProps } from './types';

const ModalHeaderActions = forwardRef<HTMLDivElement, TModalHeaderActionsProps>(
  ({ children, className, ...props }, ref) => (
    <SModalHeaderActions
      ref={ref}
      {...props}
      className={mergeClasses(modalHeaderActionsClasses.root, className)}
    >
      {children}
    </SModalHeaderActions>
  ),
);

ModalHeaderActions.displayName = 'ModalHeaderActions';

export type { TModalHeaderActionsProps };
export { modalHeaderActionsClasses } from './classes';
export { ModalHeaderActions };
export default ModalHeaderActions;
