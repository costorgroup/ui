import { HTMLAttributes, ReactNode } from 'react';

export type TCardContentProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};
