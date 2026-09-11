import { HTMLAttributes, ReactNode } from 'react';

export type TItemTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  children?: ReactNode;
};
