import { HTMLAttributes, ReactNode } from 'react';

export type TMarqueeItemProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};
