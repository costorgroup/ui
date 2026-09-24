import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { ArrowBottomIcon } from '../../../icons';
import { useAccordionContext } from '../accordion-base/context';
import { accordionSummaryClasses } from './classes';
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
      className,
      ...props
    },
    ref,
  ) => {
    const {
      expanded,
      toggle,
      color,
      variant,
      size,
      disabled,
      hasDetails,
      forceContrastText,
      colorScope,
      radius,
    } = useAccordionContext();

    return (
      <SAccordionSummary
        ref={ref}
        type="button"
        aria-expanded={expanded}
        disabled={disabled}
        paletteColor={color}
        variant={variant}
        expanded={expanded}
        expandIconPosition={expandIconPosition}
        size={size}
        hasDetails={hasDetails}
        forceContrastText={forceContrastText}
        colorScope={colorScope}
        radius={radius}
        onClick={(event) => {
          onClick?.(event);

          if (event.defaultPrevented) {
            return;
          }

          toggle(event);
        }}
        {...props}
        className={mergeClasses(
          accordionSummaryClasses.root,
          expanded && accordionSummaryClasses.expanded,
          className,
        )}
      >
        <SAccordionSummaryContent className={accordionSummaryClasses.content}>
          {children}
        </SAccordionSummaryContent>
        <SAccordionExpandIcon
          expanded={expanded}
          className={accordionSummaryClasses.expandIcon}
          aria-hidden
        >
          {expandIcon ?? (
            <ArrowBottomIcon width="0.875em" height="0.875em" />
          )}
        </SAccordionExpandIcon>
      </SAccordionSummary>
    );
  },
);

AccordionSummary.displayName = 'AccordionSummary';

export type {
  TAccordionSummaryProps,
  TAccordionExpandIconPosition,
} from './types';
export { accordionSummaryClasses } from './classes';
export { AccordionSummary };
export default AccordionSummary;
