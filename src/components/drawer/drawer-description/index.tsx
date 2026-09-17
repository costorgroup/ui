import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { drawerDescriptionClasses } from './classes';
import { SDrawerDescription } from './styles';
import { TDrawerDescriptionProps } from './types';

const DrawerDescription = forwardRef<
  HTMLParagraphElement,
  TDrawerDescriptionProps
>(({ children, className, ...props }, ref) => (
  <SDrawerDescription
    ref={ref}
    {...props}
    className={mergeClasses(drawerDescriptionClasses.root, className)}
  >
    {children}
  </SDrawerDescription>
));

DrawerDescription.displayName = 'DrawerDescription';

export type { TDrawerDescriptionProps } from './types';
export { drawerDescriptionClasses } from './classes';
export { DrawerDescription };
export default DrawerDescription;
