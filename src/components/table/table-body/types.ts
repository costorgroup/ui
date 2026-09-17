import { HTMLAttributes, ReactNode } from 'react';

export type TTableBodyProps = Omit<
  HTMLAttributes<HTMLTableSectionElement>,
  'children'
> & {
  children?: ReactNode;
};
