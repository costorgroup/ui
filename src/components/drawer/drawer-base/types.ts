import { HTMLAttributes, ReactNode } from 'react';

export type TDrawerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TDrawerAnchor = 'left' | 'right' | 'top' | 'bottom';

export type TDrawerBaseProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'title'
> & {
  children?: ReactNode;
  size?: TDrawerSize;
  anchor?: TDrawerAnchor;
  scrollable?: boolean;
};

export type TSDrawerBaseProps = {
  size: TDrawerSize;
  scrollable: boolean;
  anchor: TDrawerAnchor;
};
