import { HTMLAttributes, ReactNode } from 'react';

export type TModalBodyProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  scrollable?: boolean;
};
