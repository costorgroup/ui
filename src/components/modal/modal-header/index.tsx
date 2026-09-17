import React, { Children, forwardRef, isValidElement, ReactNode } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { modalHeaderClasses } from './classes';
import { SModalHeader, SModalHeaderMain } from './styles';
import { TModalHeaderProps } from './types';

const isHeaderActions = (child: ReactNode) =>
  isValidElement(child) &&
  typeof child.type !== 'string' &&
  (child.type as { displayName?: string }).displayName === 'ModalHeaderActions';

const ModalHeader = forwardRef<HTMLDivElement, TModalHeaderProps>(
  ({ children, className, ...props }, ref) => {
    const nodes = Children.toArray(children);
    const actions = nodes.filter(isHeaderActions);
    const rest = nodes.filter((child) => !isHeaderActions(child));

    return (
      <SModalHeader
        ref={ref}
        {...props}
        className={mergeClasses(modalHeaderClasses.root, className)}
      >
        {rest.length > 0 ? (
          <SModalHeaderMain className={modalHeaderClasses.main}>
            {rest}
          </SModalHeaderMain>
        ) : null}
        {actions}
      </SModalHeader>
    );
  },
);

ModalHeader.displayName = 'ModalHeader';

export type { TModalHeaderProps };
export { modalHeaderClasses } from './classes';
export { ModalHeader };
export default ModalHeader;
