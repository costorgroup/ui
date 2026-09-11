import React, { Children, forwardRef, isValidElement, ReactNode } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { modalHeadClasses } from './classes';
import { SModalHead, SModalHeadMain } from './styles';
import { TModalHeadProps } from './types';

const isHeadActions = (child: ReactNode) =>
  isValidElement(child) &&
  typeof child.type !== 'string' &&
  (child.type as { displayName?: string }).displayName === 'ModalHeadActions';

const ModalHead = forwardRef<HTMLDivElement, TModalHeadProps>(
  ({ children, className, ...props }, ref) => {
    const nodes = Children.toArray(children);
    const actions = nodes.filter(isHeadActions);
    const rest = nodes.filter((child) => !isHeadActions(child));

    return (
      <SModalHead
        ref={ref}
        {...props}
        className={mergeClasses(modalHeadClasses.root, className)}
      >
        {rest.length > 0 ? (
          <SModalHeadMain className={modalHeadClasses.main}>
            {rest}
          </SModalHeadMain>
        ) : null}
        {actions}
      </SModalHead>
    );
  },
);

ModalHead.displayName = 'ModalHead';

export type { TModalHeadProps };
export { modalHeadClasses } from './classes';
export { ModalHead };
export default ModalHead;
