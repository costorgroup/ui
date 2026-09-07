import { CSSProperties, HTMLAttributes, ReactNode } from 'react';

export type TLayoutDirection = 'horizontal' | 'vertical';

export type TLayoutProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  children?: ReactNode;
  direction?: TLayoutDirection;
  /** 10% chrome border around the layout. */
  bordered?: boolean;
  /** 10% chrome border between children. */
  divider?: boolean;
};

export type TSLayoutProps = {
  direction: TLayoutDirection;
  bordered: boolean;
  divider: boolean;
};

export type TLayoutContentProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color'
> & {
  children?: ReactNode;
  width?: CSSProperties['width'] | number;
  height?: CSSProperties['height'] | number;
  flex?: CSSProperties['flex'];
};

export type TSLayoutContentProps = {
  width?: TLayoutContentProps['width'];
  height?: TLayoutContentProps['height'];
  flex?: TLayoutContentProps['flex'];
};
