import { HTMLAttributes, ReactNode } from 'react';

export type TTableHeadProps = Omit<
  HTMLAttributes<HTMLTableSectionElement>,
  'children'
> & {
  children?: ReactNode;
};
