import { HTMLAttributes, ReactNode } from 'react';

export type TAlertContentProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};
