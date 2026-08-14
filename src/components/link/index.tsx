import React, { ElementType, forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { linkClasses } from './classes';
import type { TPolymorphicComponent } from '../../helpers/polymorphic';
import { SLink } from './styles';
import { TLinkOwnProps, TLinkProps } from './types';

const Link = forwardRef(function Link<C extends ElementType = 'a'>(
  {
    as,
    children,
    color = 'primary',
    variant = 'hover',
    size = 'md',
    className, ...props
  }: TLinkProps<C>,
  ref: React.Ref<Element>,
) {
  return (
    <SLink
      as={as}
      ref={ref as React.Ref<HTMLAnchorElement>}
      color={color}
      variant={variant}
      size={size}
      {...props}
        className={mergeClasses(
          linkClasses.root,
          className,
        )}
    >
      {children}
    </SLink>
  );
}) as TPolymorphicComponent<'a', TLinkOwnProps>;

Link.displayName = 'Link';

export type {
  TLinkProps,
  TLinkOwnProps,
  TLinkVariant,
  TLinkSize,
} from './types';
export { linkClasses } from './classes';
export { Link };
export default Link;
