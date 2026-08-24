import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
} from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { sectionGroupClasses } from './classes';
import { SectionGroupContext } from './context';
import { SSectionGroup } from './styles';
import { TSectionGroupProps } from './types';

const SectionGroup = forwardRef<HTMLDivElement, TSectionGroupProps>(
  (
    {
      children,
      align = 'left',
      color = 'primary',
      variant = 'halo',
      gap = 'xl',
      className,
      ...props
    },
    ref,
  ) => {
    const items = Children.toArray(children).filter(isValidElement);
    const count = items.length;

    return (
      <SSectionGroup
        ref={ref}
        align={align}
        color={color}
        variant={variant}
        gap={gap}
        {...props}
        className={mergeClasses(
          sectionGroupClasses.root,
          align === 'left' && sectionGroupClasses.alignLeft,
          align === 'center' && sectionGroupClasses.alignCenter,
          align === 'right' && sectionGroupClasses.alignRight,
          variant === 'dot' && sectionGroupClasses.variantDot,
          variant === 'halo' && sectionGroupClasses.variantHalo,
          variant === 'line' && sectionGroupClasses.variantLine,
          variant === 'none' && sectionGroupClasses.variantNone,
          className,
        )}
      >
        {items.map((child, index) => (
          <SectionGroupContext.Provider
            key={child.key ?? index}
            value={{ align, color, variant, index, count }}
          >
            {cloneElement(child as ReactElement)}
          </SectionGroupContext.Provider>
        ))}
      </SSectionGroup>
    );
  },
);

SectionGroup.displayName = 'SectionGroup';

export type {
  TSectionGroupProps,
  TSectionAlign,
  TSectionVariant,
  TSectionGap,
} from './types';
export { sectionGroupClasses } from './classes';
export { SectionGroupContext } from './context';
export { SectionGroup };
export default SectionGroup;
