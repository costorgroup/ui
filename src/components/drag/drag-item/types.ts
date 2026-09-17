import { HTMLAttributes, ReactNode } from 'react';

export type TDragItemProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};
