import { HTMLAttributes, ReactNode } from 'react';

export type TSidebarItemTitleProps = HTMLAttributes<HTMLSpanElement> & {
  children?: ReactNode;
};
