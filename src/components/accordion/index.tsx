import React, { forwardRef } from 'react';
import { AccordionBase } from './accordion-base';
import { AccordionSummary } from './accordion-summary';
import { AccordionDetails } from './accordion-details';
import { ArrowBottomIcon } from '../../icons';
import { TAccordionProps } from './types';

const Accordion = forwardRef<HTMLDivElement, TAccordionProps>(
  (
    {
      summary,
      icon,
      expandIconPosition = 'right',
      children,
      expanded,
      defaultExpanded,
      onChange,
      disabled,
      color,
      variant,
      size,
      ...props
    },
    ref,
  ) => {
    return (
      <AccordionBase
        ref={ref}
        expanded={expanded}
        defaultExpanded={defaultExpanded}
        onChange={onChange}
        disabled={disabled}
        color={color}
        variant={variant}
        size={size}
        {...props}
      >
        <AccordionSummary
          expandIcon={icon ?? <ArrowBottomIcon />}
          expandIconPosition={expandIconPosition}
        >
          {summary}
        </AccordionSummary>
        {children != null ? (
          <AccordionDetails>{children}</AccordionDetails>
        ) : null}
      </AccordionBase>
    );
  },
);

Accordion.displayName = 'Accordion';

export type { TAccordionProps };
export { Accordion };
export default Accordion;
