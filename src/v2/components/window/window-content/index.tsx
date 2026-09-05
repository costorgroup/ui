import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { windowContentClasses } from './classes';
import { SWindowContent } from './styles';
import { TWindowContentProps } from './types';

const WindowContent = forwardRef<HTMLDivElement, TWindowContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SWindowContent
        ref={ref}
        {...props}
        className={mergeClasses(windowContentClasses.root, className)}
      >
        {children}
      </SWindowContent>
    );
  },
);

WindowContent.displayName = 'WindowContent';

export type { TWindowContentProps };
export { windowContentClasses } from './classes';
export { WindowContent };
export default WindowContent;
