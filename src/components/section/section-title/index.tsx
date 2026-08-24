import React, { forwardRef, ReactElement, useContext } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import type { TPolymorphicPropsWithRef } from '../../../helpers/polymorphic';
import { SectionGroupContext } from '../section-group/context';
import { sectionTitleClasses } from './classes';
import {
  SSectionTitle,
  SSectionTitleLabel,
  SSectionTitleMarker,
} from './styles';
import {
  TSectionTitleAs,
  TSectionTitleOwnProps,
  TSectionTitleProps,
} from './types';

type TSectionTitleComponent = (<C extends TSectionTitleAs = 'h3'>(
  props: TPolymorphicPropsWithRef<C, TSectionTitleOwnProps>,
) => ReactElement | null) & {
  displayName?: string;
};

const SectionTitle = forwardRef(function SectionTitle<
  C extends TSectionTitleAs = 'h3',
>(
  {
    as,
    children,
    showMarker = true,
    className,
    ...props
  }: TSectionTitleProps<C>,
  ref: React.Ref<Element>,
) {
  const group = useContext(SectionGroupContext);
  const align = group?.align ?? 'left';
  const variant = group?.variant ?? 'halo';
  const tag = (as ?? 'h3') as TSectionTitleAs;

  return (
    <SSectionTitle
      as={tag}
      ref={ref as React.Ref<HTMLHeadingElement>}
      align={align}
      variant={variant}
      {...props}
      className={mergeClasses(sectionTitleClasses.root, className)}
    >
      {showMarker ? (
        <SSectionTitleMarker
          className={sectionTitleClasses.marker}
          aria-hidden
        />
      ) : null}
      <SSectionTitleLabel className={sectionTitleClasses.label}>
        {children}
      </SSectionTitleLabel>
    </SSectionTitle>
  );
}) as TSectionTitleComponent;

SectionTitle.displayName = 'SectionTitle';

export type {
  TSectionTitleProps,
  TSectionTitleOwnProps,
  TSectionTitleAs,
} from './types';
export { sectionTitleClasses } from './classes';
export { SSectionTitleMarker } from './styles';
export { SectionTitle };
export default SectionTitle;
