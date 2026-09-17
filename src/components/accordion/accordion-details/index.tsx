import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { useAccordionContext } from '../accordion-base/context';
import { accordionDetailsClasses } from './classes';
import {
  SAccordionDetails,
  SAccordionDetailsClip,
  SAccordionDetailsInner,
} from './styles';
import { TAccordionDetailsProps } from './types';

const AccordionDetails = forwardRef<HTMLDivElement, TAccordionDetailsProps>(
  ({ children, className, ...props }, ref) => {
    const { expanded, color, variant, size } = useAccordionContext();

    return (
      <SAccordionDetails
        ref={ref}
        expanded={expanded}
        aria-hidden={!expanded}
        {...props}
        className={mergeClasses(accordionDetailsClasses.root, className)}
      >
        <SAccordionDetailsClip>
          <SAccordionDetailsInner size={size} variant={variant} color={color}>
            {children}
          </SAccordionDetailsInner>
        </SAccordionDetailsClip>
      </SAccordionDetails>
    );
  },
);

AccordionDetails.displayName = 'AccordionDetails';

export type { TAccordionDetailsProps };
export { accordionDetailsClasses } from './classes';
export { AccordionDetails };
export default AccordionDetails;
