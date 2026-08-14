import { HTMLAttributes, ReactNode } from 'react';

export type TTableRowProps = HTMLAttributes<HTMLTableRowElement> & {
  children?: ReactNode;
};
