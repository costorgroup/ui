import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { slidePermanentContentClasses } from './classes';
import { SSlidePermanentContent } from './styles';
import { TSlidePermanentContentProps } from './types';

const SlidePermanentContent = forwardRef<
  HTMLDivElement,
  TSlidePermanentContentProps
>(({ children, className, ...props }, ref) => {
  return (
    <SSlidePermanentContent
      ref={ref}
      data-slot="permanent-content"
      {...props}
      className={mergeClasses(slidePermanentContentClasses.root, className)}
    >
      {children}
    </SSlidePermanentContent>
  );
});

SlidePermanentContent.displayName = 'SlidePermanentContent';

export type { TSlidePermanentContentProps } from './types';
export { slidePermanentContentClasses } from './classes';
export { SlidePermanentContent };
export default SlidePermanentContent;
