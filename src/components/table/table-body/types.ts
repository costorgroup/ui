import { HTMLAttributes, ReactNode } from 'react';

export type TTableBodyProps = HTMLAttributes<HTMLTableSectionElement> & {
  children?: ReactNode;
};
