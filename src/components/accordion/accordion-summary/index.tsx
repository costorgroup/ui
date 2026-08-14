import React, { forwardRef, useContext } from 'react';
import { ArrowBottomIcon } from '../../../icons';
import { AccordionContext } from '../accordion-base/context';
import {
  SAccordionExpandIcon,
  SAccordionSummary,
  SAccordionSummaryContent,
} from './styles';
import { TAccordionSummaryProps } from './types';

const AccordionSummary = forwardRef<HTMLButtonElement, TAccordionSummaryProps>(
  (
    {
      children,
      expandIcon,
      expandIconPosition = 'right',
      onClick,
      ...props
    },
    ref,
  ) => {
    const context = useContext(AccordionContext);

    if (!context) {
      throw new Error('AccordionSummary must be used within AccordionBase');
    }

    const { expanded, toggle, variant, disabled } = context;

    return (
      <SAccordionSummary
        ref={ref}
        type="button"
        aria-expanded={expanded}
        disabled={disabled}
        expandIconPosition={expandIconPosition}
        expanded={expanded}
        variant={variant}
        onClick={(event) => {
          onClick?.(event);

          if (event.defaultPrevented) {
            return;
          }

          toggle(event);
        }}
        {...props}
      >
        <SAccordionSummaryContent>{children}</SAccordionSummaryContent>
        <SAccordionExpandIcon expanded={expanded} variant={variant} aria-hidden>
          {expandIcon ?? <ArrowBottomIcon />}
        </SAccordionExpandIcon>
      </SAccordionSummary>
    );
  },
);

AccordionSummary.displayName = 'AccordionSummary';

export type { TAccordionSummaryProps, TAccordionExpandIconPosition } from './types';
export { AccordionSummary };
export default AccordionSummary;
