import { HTMLAttributes, ReactNode } from 'react';

export type TBreadcrumbSeparatorProps = HTMLAttributes<HTMLLIElement> & {
  children?: ReactNode;
};
