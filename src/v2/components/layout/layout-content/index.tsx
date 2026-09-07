import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { TLayoutContentProps } from '../types';
import { layoutContentClasses } from './classes';
import { SLayoutContent } from './styles';

const LayoutContent = forwardRef<HTMLDivElement, TLayoutContentProps>(
  ({ children, width, height, flex, className, ...props }, ref) => {
    return (
      <SLayoutContent
        ref={ref}
        width={width}
        height={height}
        flex={flex}
        {...props}
        className={mergeClasses(layoutContentClasses.root, className)}
      >
        {children}
      </SLayoutContent>
    );
  },
);

LayoutContent.displayName = 'LayoutContent';

export type { TLayoutContentProps } from '../types';
export { layoutContentClasses } from './classes';
export { LayoutContent };
export default LayoutContent;
