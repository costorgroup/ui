import { HTMLAttributes, ReactNode } from 'react';

export type TBreadcrumbItemProps = HTMLAttributes<HTMLLIElement> & {
  children?: ReactNode;
};
