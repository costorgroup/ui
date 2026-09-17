import { HTMLAttributes, ReactNode } from 'react';

export type TTableRowProps = Omit<HTMLAttributes<HTMLTableRowElement>, 'children'> & {
  children?: ReactNode;
};
