import { AnchorHTMLAttributes, ReactNode } from 'react';

export type TBreadcrumbLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: ReactNode;
};
