import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { modalHeadActionsClasses } from './classes';
import { SModalHeadActions } from './styles';
import { TModalHeadActionsProps } from './types';

const ModalHeadActions = forwardRef<HTMLDivElement, TModalHeadActionsProps>(
  ({ children, className, ...props }, ref) => (
    <SModalHeadActions
      ref={ref}
      {...props}
      className={mergeClasses(modalHeadActionsClasses.root, className)}
    >
      {children}
    </SModalHeadActions>
  ),
);

ModalHeadActions.displayName = 'ModalHeadActions';

export type { TModalHeadActionsProps };
export { modalHeadActionsClasses } from './classes';
export { ModalHeadActions };
export default ModalHeadActions;
