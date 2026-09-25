import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { useAccordionContext } from '../accordion-base/context';
import { accordionSummaryClasses } from './classes';
import {
  SAccordionDragHandle,
  SAccordionExpandIcon,
  SAccordionSummary,
  SAccordionSummaryActions,
  SAccordionSummaryButton,
  SAccordionSummaryContent,
} from './styles';
import { TAccordionSummaryProps } from './types';

/**
 * Summary row: a toggle button, then optional actions and a drag grip. The
 * actions sit outside the button so they can hold buttons of their own.
 */
const AccordionSummary = forwardRef<HTMLButtonElement, TAccordionSummaryProps>(
  (
    {
      children,
      expandIcon,
      expandIconPosition = 'right',
      actions,
      actionsVisibility = 'hover',
      dragHandle: dragHandleProp,
      dragHandleLabel = 'Drag to reorder',
      onClick,
      className,
      style,
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
      forceContrastText,
      appearance,
      colorScope,
      sortable,
    } = useAccordionContext();
    const dragHandle = dragHandleProp ?? sortable;
    const hasActions = actions != null && actions !== false;

    const icon =
      expandIcon != null ? (
        <SAccordionExpandIcon
          expanded={expanded}
          className={accordionSummaryClasses.expandIcon}
          aria-hidden
        >
          {expandIcon}
        </SAccordionExpandIcon>
      ) : null;

    return (
      <SAccordionSummary
        paletteColor={color}
        variant={variant}
        expanded={expanded}
        size={size}
        forceContrastText={forceContrastText}
        appearance={appearance}
        colorScope={colorScope}
        hasTrailing={hasActions || dragHandle}
        actionsVisibility={actionsVisibility}
        style={style}
        className={mergeClasses(
          accordionSummaryClasses.root,
          expanded && accordionSummaryClasses.expanded,
          className,
        )}
      >
        <SAccordionSummaryButton
          ref={ref}
          type="button"
          aria-expanded={expanded}
          disabled={disabled}
          paletteColor={color}
          size={size}
          onClick={(event) => {
            onClick?.(event);

            if (event.defaultPrevented) {
              return;
            }

            toggle(event);
          }}
          {...props}
          className={accordionSummaryClasses.button}
        >
          {expandIconPosition === 'left' && icon}
          <SAccordionSummaryContent className={accordionSummaryClasses.content}>
            {children}
          </SAccordionSummaryContent>
          {expandIconPosition === 'right' && icon}
        </SAccordionSummaryButton>
        {hasActions && (
          <SAccordionSummaryActions className={accordionSummaryClasses.actions}>
            {actions}
          </SAccordionSummaryActions>
        )}
        {dragHandle && (
          <SAccordionDragHandle
            className={accordionSummaryClasses.dragHandle}
            title={dragHandleLabel}
            aria-hidden
          />
        )}
      </SAccordionSummary>
    );
  },
);

AccordionSummary.displayName = 'AccordionSummary';

export type {
  TAccordionSummaryProps,
  TAccordionExpandIconPosition,
  TAccordionActionsVisibility,
} from './types';
export { accordionSummaryClasses } from './classes';
export { AccordionSummary };
export default AccordionSummary;
