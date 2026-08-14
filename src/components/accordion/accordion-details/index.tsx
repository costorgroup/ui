import React, { forwardRef, useContext } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { accordionDetailsClasses } from './classes';
import { AccordionContext } from '../accordion-base/context';
import {
  SAccordionDetails,
  SAccordionDetailsClip,
  SAccordionDetailsInner,
} from './styles';
import { TAccordionDetailsProps } from './types';

const AccordionDetails = forwardRef<HTMLDivElement, TAccordionDetailsProps>(
  ({ children, className, ...props }, ref) => {
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
        className={mergeClasses(
          accordionDetailsClasses.root,
          className,
        )}
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
export { accordionDetailsClasses } from './classes';
export { AccordionDetails };
export default AccordionDetails;
