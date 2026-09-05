import React, { forwardRef, useMemo } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { accordionGroupClasses } from './classes';
import { AccordionGroupContext } from './context';
import { SAccordionGroup } from './styles';
import { TAccordionGroupProps } from './types';

const AccordionGroup = forwardRef<HTMLDivElement, TAccordionGroupProps>(
  (
    {
      children,
      color,
      variant,
      size,
      radius = 'medium',
      className,
      ...props
    },
    ref,
  ) => {
    const contextValue = useMemo(
      () => ({ color, variant, size, radius }),
      [color, radius, size, variant],
    );

    return (
      <AccordionGroupContext.Provider value={contextValue}>
        <SAccordionGroup
          ref={ref}
          radius={radius}
          role="group"
          {...props}
          className={mergeClasses(accordionGroupClasses.root, className)}
        >
          {children}
        </SAccordionGroup>
      </AccordionGroupContext.Provider>
    );
  },
);

AccordionGroup.displayName = 'AccordionGroup';

export type { TAccordionGroupProps, TAccordionGroupRadius } from './types';
export { accordionGroupClasses } from './classes';
export {
  AccordionGroupContext,
  useAccordionGroupContext,
} from './context';
export { AccordionGroup };
export default AccordionGroup;
