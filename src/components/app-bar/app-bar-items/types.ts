import { HTMLAttributes, ReactNode } from 'react';

export type TAppBarItemsProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};
