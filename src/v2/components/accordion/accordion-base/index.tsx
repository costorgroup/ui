import React, {
  Children,
  forwardRef,
  isValidElement,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { useAccordionGroupContext } from '../accordion-group/context';
import { TPaletteColor } from '../../../../theme/types';
import { TAccordionVariant } from '../variant-styles';
import { accordionBaseClasses } from './classes';
import { AccordionContext, TAccordionContextValue, TAccordionSize } from './context';
import { SAccordionBase } from './styles';
import { TAccordionBaseProps } from './types';

const AccordionBase = forwardRef<HTMLDivElement, TAccordionBaseProps>(
  (
    {
      children,
      expanded: expandedProp,
      defaultExpanded = false,
      onChange,
      disabled = false,
      color: colorProp,
      variant: variantProp,
      size: sizeProp,
      radius: radiusProp,
      hasDetails: hasDetailsProp,
      className,
      ...props
    },
    ref,
  ) => {
    const group = useAccordionGroupContext();
    const color: TPaletteColor = colorProp ?? group?.color ?? 'default';
    const variant: TAccordionVariant =
      variantProp ?? group?.variant ?? 'subtle';
    const size: TAccordionSize = sizeProp ?? group?.size ?? 'md';
    const radius = radiusProp ?? group?.radius ?? 'medium';
    const grouped = group != null;
    const isControlled = expandedProp !== undefined;
    const [uncontrolledExpanded, setUncontrolledExpanded] =
      useState(defaultExpanded);
    const expanded = isControlled
      ? Boolean(expandedProp)
      : uncontrolledExpanded;

    const hasDetails = useMemo(() => {
      if (hasDetailsProp != null) {
        return hasDetailsProp;
      }

      return Children.toArray(children).some(
        (child) =>
          isValidElement(child) &&
          (child.type as { displayName?: string })?.displayName ===
            'AccordionDetails',
      );
    }, [children, hasDetailsProp]);

    const toggle = useCallback(
      (event: React.SyntheticEvent) => {
        if (disabled) {
          return;
        }

        const next = !expanded;

        if (!isControlled) {
          setUncontrolledExpanded(next);
        }

        onChange?.(event, next);
      },
      [disabled, expanded, isControlled, onChange],
    );

    const value = useMemo<TAccordionContextValue>(
      () => ({
        expanded,
        toggle,
        color,
        variant,
        size,
        radius,
        disabled,
        grouped,
        hasDetails,
      }),
      [
        color,
        disabled,
        expanded,
        grouped,
        hasDetails,
        radius,
        size,
        toggle,
        variant,
      ],
    );

    return (
      <AccordionContext.Provider value={value}>
        <SAccordionBase
          ref={ref}
          radius={radius}
          size={size}
          expanded={expanded}
          disabled={disabled}
          color={color}
          variant={variant}
          grouped={grouped}
          data-accordion-grouped={grouped ? '' : undefined}
          {...props}
          className={mergeClasses(
            accordionBaseClasses.root,
            grouped && accordionBaseClasses.grouped,
            expanded && accordionBaseClasses.expanded,
            disabled && accordionBaseClasses.disabled,
            className,
          )}
        >
          {children}
        </SAccordionBase>
      </AccordionContext.Provider>
    );
  },
);

AccordionBase.displayName = 'AccordionBase';

export type { TAccordionBaseProps };
export type { TAccordionSize } from './context';
export { AccordionContext, useAccordionContext } from './context';
export { accordionBaseClasses } from './classes';
export { AccordionBase };
export default AccordionBase;
