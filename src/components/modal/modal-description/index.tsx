import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { modalDescriptionClasses } from './classes';
import { SModalDescription } from './styles';
import { TModalDescriptionProps } from './types';

const ModalDescription = forwardRef<
  HTMLParagraphElement,
  TModalDescriptionProps
>(({ children, className, ...props }, ref) => (
  <SModalDescription
    ref={ref}
    {...props}
    className={mergeClasses(modalDescriptionClasses.root, className)}
  >
    {children}
  </SModalDescription>
));

ModalDescription.displayName = 'ModalDescription';

export type { TModalDescriptionProps } from './types';
export { modalDescriptionClasses } from './classes';
export { ModalDescription };
export default ModalDescription;
