import React, {
  Children,
  forwardRef,
  isValidElement,
  useCallback,
  useId,
  useMemo,
  useState,
} from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { useAccordionGroupContext } from '../accordion-group/context';
import { TPaletteColor } from '../../../theme/types';
import {
  TAccordionAppearance,
  TAccordionColorScope,
  TAccordionVariant,
} from '../variant-styles';
import { accordionBaseClasses } from './classes';
import { AccordionContext, TAccordionContextValue, TAccordionSize } from './context';
import { SAccordionBase, SAccordionBaseDragItem } from './styles';
import { TAccordionBaseProps } from './types';

const AccordionBase = forwardRef<HTMLDivElement, TAccordionBaseProps>(
  (
    {
      children,
      expanded: expandedProp,
      defaultExpanded = false,
      onChange,
      value: valueProp,
      disabled = false,
      color: colorProp,
      variant: variantProp,
      size: sizeProp,
      radius: radiusProp,
      hasDetails: hasDetailsProp,
      colorScope: colorScopeProp,
      forceContrastText: forceContrastTextProp,
      appearance: appearanceProp,
      className,
      ...props
    },
    ref,
  ) => {
    const group = useAccordionGroupContext();
    const autoValue = useId();
    const value = valueProp ?? autoValue;
    const color: TPaletteColor = colorProp ?? group?.color ?? 'default';
    const variant: TAccordionVariant =
      variantProp ?? group?.variant ?? 'subtle';
    const size: TAccordionSize = sizeProp ?? group?.size ?? 'md';
    const radius = radiusProp ?? group?.radius ?? 'md';
    const colorScope: TAccordionColorScope =
      colorScopeProp ?? group?.colorScope ?? 'summary';
    const forceContrastText =
      forceContrastTextProp ?? group?.forceContrastText ?? false;
    const appearance: TAccordionAppearance =
      appearanceProp ?? group?.appearance ?? 'opaque';
    const grouped = group != null;
    const sortable = group?.sortable ?? false;
    // In an exclusive group the group owns which item is open.
    const groupOwned = group?.exclusive === true;
    const isControlled = expandedProp !== undefined;
    const [uncontrolledExpanded, setUncontrolledExpanded] =
      useState(defaultExpanded);
    let expanded = uncontrolledExpanded;

    if (isControlled) {
      expanded = Boolean(expandedProp);
    } else if (groupOwned) {
      expanded = group.value === value;
    }

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

        if (groupOwned) {
          group.setValue(event, next ? value : null);
        } else if (!isControlled) {
          setUncontrolledExpanded(next);
        }

        onChange?.(event, next);
      },
      [disabled, expanded, group, groupOwned, isControlled, onChange, value],
    );

    const contextValue = useMemo<TAccordionContextValue>(
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
        colorScope,
        forceContrastText,
        appearance,
        sortable,
      }),
      [
        color,
        colorScope,
        disabled,
        forceContrastText,
        appearance,
        expanded,
        grouped,
        hasDetails,
        radius,
        size,
        sortable,
        toggle,
        variant,
      ],
    );

    const Root = sortable ? SAccordionBaseDragItem : SAccordionBase;

    return (
      <AccordionContext.Provider value={contextValue}>
        <Root
          ref={ref}
          radius={radius}
          size={size}
          expanded={expanded}
          disabled={disabled}
          color={color}
          variant={variant}
          grouped={grouped}
          colorScope={colorScope}
          forceContrastText={forceContrastText}
          appearance={appearance}
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
        </Root>
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
