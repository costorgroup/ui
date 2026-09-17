import { HTMLAttributes, ReactNode } from 'react';

export type TNavigationSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TNavigationPosition = 'static' | 'sticky' | 'fixed';

export type TNavigationProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  children?: ReactNode;
  size?: TNavigationSize;
  position?: TNavigationPosition;
};

export type TSNavigationProps = {
  size: TNavigationSize;
  position: TNavigationPosition;
};
