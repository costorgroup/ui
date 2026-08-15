import { HTMLAttributes, ReactNode } from 'react';

export type TDraggableProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};
