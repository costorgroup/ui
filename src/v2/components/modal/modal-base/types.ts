import { HTMLAttributes, ReactNode } from 'react';

export type TModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TModalVariant = 'subtle' | 'surface';

export type TModalBaseProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  children?: ReactNode;
  size?: TModalSize;
  variant?: TModalVariant;
  scrollable?: boolean;
};

export type TSModalBaseProps = {
  size: TModalSize;
  scrollable: boolean;
  variant: TModalVariant;
};
