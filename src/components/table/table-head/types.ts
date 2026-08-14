import { HTMLAttributes, ReactNode } from 'react';

export type TTableHeadProps = HTMLAttributes<HTMLTableSectionElement> & {
  children?: ReactNode;
};
