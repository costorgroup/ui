import { HTMLAttributes, ReactNode } from 'react';

export type TPaginationBaseProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
};
