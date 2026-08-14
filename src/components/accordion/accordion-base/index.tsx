import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { accordionBaseClasses } from './classes';
import { AccordionContext } from './context';
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
      color = 'primary',
      variant = 'subtle',
      size = 'md',
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = expandedProp !== undefined;
    const [uncontrolledExpanded, setUncontrolledExpanded] =
      useState(defaultExpanded);
    const expanded = isControlled
      ? Boolean(expandedProp)
      : uncontrolledExpanded;

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

    const value = useMemo(
      () => ({
        expanded,
        toggle,
        color,
        variant,
        size,
        disabled,
      }),
      [color, disabled, expanded, size, toggle, variant],
    );

    return (
      <AccordionContext.Provider value={value}>
        <SAccordionBase
          ref={ref}
          expanded={expanded}
          disabled={disabled}
          color={color}
          variant={variant}
          size={size}
          {...props}
        className={mergeClasses(
          accordionBaseClasses.root,
          disabled && accordionBaseClasses.disabled,
          expanded && accordionBaseClasses.expanded,
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
export type { TAccordionSize, TAccordionVariant } from './context';
export { AccordionContext } from './context';
export { accordionBaseClasses } from './classes';
export { AccordionBase };
export default AccordionBase;
