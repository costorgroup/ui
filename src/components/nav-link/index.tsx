import React, { ElementType, forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import type { TPolymorphicComponent } from '../../helpers/polymorphic';
import { navLinkClasses } from './classes';
import { SNavLink } from './styles';
import { TNavLinkOwnProps, TNavLinkProps } from './types';

const NavLink = forwardRef(function NavLink<C extends ElementType = 'a'>(
  { as, children, active = false, className, ...props }: TNavLinkProps<C>,
  ref: React.Ref<Element>,
) {
  const tag = as ?? 'a';

  return (
    <SNavLink
      as={tag}
      ref={ref as React.Ref<HTMLAnchorElement>}
      aria-current={active ? 'page' : undefined}
      data-slot="nav-link"
      {...props}
      className={mergeClasses(navLinkClasses.root, className)}
    >
      {children}
    </SNavLink>
  );
}) as TPolymorphicComponent<'a', TNavLinkOwnProps>;

NavLink.displayName = 'NavLink';

export type { TNavLinkProps, TNavLinkOwnProps } from './types';
export { navLinkClasses } from './classes';
export { NavLink };
export default NavLink;
