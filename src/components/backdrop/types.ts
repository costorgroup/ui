import { HTMLAttributes, ReactNode } from 'react';
import { TThemeZIndex } from '../../theme/types';

export type TBackdropAlign = 'start' | 'end' | 'center' | 'stretch';
export type TBackdropJustify = 'start' | 'end' | 'center' | 'stretch';
export type TBackdropLayer = Extract<keyof TThemeZIndex, 'modal' | 'drawer'>;

export type TBackdropProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'onClose'
> & {
  children?: ReactNode;
  scrollable?: boolean;
  align?: TBackdropAlign;
  justify?: TBackdropJustify;
  padding?: boolean;
  layer?: TBackdropLayer;
  lockScroll?: boolean;
  onClose?: () => void;
};

export type TSBackdropProps = {
  scrollable: boolean;
  align: TBackdropAlign;
  justify: TBackdropJustify;
  padding: boolean;
  layer: TBackdropLayer;
};
