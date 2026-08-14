import React, { forwardRef, useContext } from 'react';
import { AccordionContext } from '../accordion-base/context';
import {
  SAccordionDetails,
  SAccordionDetailsClip,
  SAccordionDetailsInner,
} from './styles';
import { TAccordionDetailsProps } from './types';

const AccordionDetails = forwardRef<HTMLDivElement, TAccordionDetailsProps>(
  ({ children, ...props }, ref) => {
    const context = useContext(AccordionContext);

    if (!context) {
      throw new Error('AccordionDetails must be used within AccordionBase');
    }

    const { expanded } = context;

    return (
      <SAccordionDetails
        ref={ref}
        expanded={expanded}
        aria-hidden={!expanded}
        {...props}
      >
        <SAccordionDetailsClip>
          <SAccordionDetailsInner>{children}</SAccordionDetailsInner>
        </SAccordionDetailsClip>
      </SAccordionDetails>
    );
  },
);

AccordionDetails.displayName = 'AccordionDetails';

export type { TAccordionDetailsProps };
export { AccordionDetails };
export default AccordionDetails;
