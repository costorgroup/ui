import React, { forwardRef } from 'react';
import { SAccordionGroup } from './styles';
import { TAccordionGroupProps } from './types';

const AccordionGroup = forwardRef<HTMLDivElement, TAccordionGroupProps>(
  ({ children, radius = 'medium', ...props }, ref) => {
    return (
      <SAccordionGroup ref={ref} radius={radius} {...props}>
        {children}
      </SAccordionGroup>
    );
  },
);

AccordionGroup.displayName = 'AccordionGroup';

export type { TAccordionGroupProps, TAccordionGroupRadius } from './types';
export { AccordionGroup };
export default AccordionGroup;
