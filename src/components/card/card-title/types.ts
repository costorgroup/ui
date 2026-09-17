import { HTMLAttributes, ReactNode } from 'react';

export type TCardTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  children?: ReactNode;
};
