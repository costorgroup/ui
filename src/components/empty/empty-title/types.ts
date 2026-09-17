import { HTMLAttributes, ReactNode } from 'react';

export type TEmptyTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  children?: ReactNode;
};
