import { HTMLAttributes, ReactNode } from 'react';

export type TModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TModalBaseProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'title'
> & {
  children?: ReactNode;
  size?: TModalSize;
  scrollable?: boolean;
};

export type TSModalBaseProps = {
  size: TModalSize;
  scrollable: boolean;
};
