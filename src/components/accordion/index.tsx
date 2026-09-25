import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { AccordionBase } from './accordion-base';
import { AccordionDetails } from './accordion-details';
import { AccordionSummary } from './accordion-summary';
import { accordionClasses } from './classes';
import { TAccordionProps } from './types';
import { mergeSlotProps } from '../../helpers/slot-props';

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
      radius,
      colorScope,
      forceContrastText,
      className,
      slotProps,
      ...props
    },
    ref,
  ) => {
    const hasDetails = children != null;

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
        radius={radius}
        colorScope={colorScope}
        forceContrastText={forceContrastText}
        hasDetails={hasDetails}
        {...props}
        className={mergeClasses(
          accordionClasses.root,
          disabled && accordionClasses.disabled,
          expanded && accordionClasses.expanded,
          className,
        )}
      >
        <AccordionSummary
          {...mergeSlotProps(
            {
              expandIcon: icon,
              expandIconPosition,
              className: accordionClasses.summary,
            },
            slotProps?.summary,
          )}
        >
          {summary}
        </AccordionSummary>
        {hasDetails ? (
          <AccordionDetails
            {...mergeSlotProps(
              {
                className: accordionClasses.details,
              },
              slotProps?.details,
            )}
          >
            {children}
          </AccordionDetails>
        ) : null}
      </AccordionBase>
    );
  },
);

Accordion.displayName = 'Accordion';

export type {
  TAccordionProps,
  TAccordionSlotProps,
  TAccordionRadius,
  TAccordionExpandIconPosition,
  TAccordionSize,
} from './types';
export type {
  TAccordionVariant,
  TAccordionColorScope,
} from './variant-styles';
export { AccordionBase } from './accordion-base';
export type { TAccordionBaseProps } from './accordion-base';
export { accordionBaseClasses } from './accordion-base';
export { AccordionSummary } from './accordion-summary';
export type { TAccordionSummaryProps } from './accordion-summary';
export { accordionSummaryClasses } from './accordion-summary';
export { AccordionDetails } from './accordion-details';
export type { TAccordionDetailsProps } from './accordion-details';
export { accordionDetailsClasses } from './accordion-details';
export { AccordionGroup, accordionGroupClasses } from './accordion-group';
export type { TAccordionGroupProps } from './accordion-group';
export { accordionClasses } from './classes';
export { Accordion };
export default Accordion;
