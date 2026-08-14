import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { accordionGroupClasses } from './classes';
import { SAccordionGroup } from './styles';
import { TAccordionGroupProps } from './types';

const AccordionGroup = forwardRef<HTMLDivElement, TAccordionGroupProps>(
  ({ children, radius = 'medium', className, ...props }, ref) => {
    return (
      <SAccordionGroup ref={ref} radius={radius} {...props}
        className={mergeClasses(
          accordionGroupClasses.root,
          className,
        )}>
        {children}
      </SAccordionGroup>
    );
  },
);

AccordionGroup.displayName = 'AccordionGroup';

export type { TAccordionGroupProps, TAccordionGroupRadius } from './types';
export { accordionGroupClasses } from './classes';
export { AccordionGroup };
export default AccordionGroup;
