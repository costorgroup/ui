import React, { forwardRef, useContext } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { SectionGroupContext } from '../section-group/context';
import { sectionContentClasses } from './classes';
import { SSectionContent } from './styles';
import { TSectionContentProps } from './types';

const SectionContent = forwardRef<HTMLDivElement, TSectionContentProps>(
  ({ children, className, ...props }, ref) => {
    const group = useContext(SectionGroupContext);
    const align = group?.align ?? 'left';
    const variant = group?.variant ?? 'halo';

    return (
      <SSectionContent
        ref={ref}
        align={align}
        variant={variant}
        {...props}
        className={mergeClasses(sectionContentClasses.root, className)}
      >
        {children}
      </SSectionContent>
    );
  },
);

SectionContent.displayName = 'SectionContent';

export type { TSectionContentProps } from './types';
export { sectionContentClasses } from './classes';
export { SectionContent };
export default SectionContent;
