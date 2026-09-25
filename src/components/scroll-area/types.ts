import { HTMLAttributes, ReactNode } from 'react';
import type { TSlotProps } from '../../helpers/slot-props';

export type TScrollAreaScrollbarVisibility =
  | 'hover'
  | 'always'
  | 'never'
  | 'hidden';

export type TScrollAreaScrollbarPosition =
  | 'preferred'
  | 'inverted'
  | 'opposite';

export type TScrollAreaScrollbarDirection = 'vertical' | 'horizontal';

export type TScrollAreaScrollbarY = 'left' | 'right';
export type TScrollAreaScrollbarX = 'top' | 'bottom';

export type TScrollAreaSlotProps = TSlotProps<{
  fade: HTMLAttributes<HTMLDivElement>;
  viewport: HTMLAttributes<HTMLDivElement>;
  scrollbar: HTMLAttributes<HTMLDivElement>;
  thumb: HTMLAttributes<HTMLDivElement>;
}>;

export type TScrollAreaProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  children?: ReactNode;
  fade?: boolean;
  fadeSize?: number | string;
  fadeReveal?: number | string;
  scrollbarVisibility?: TScrollAreaScrollbarVisibility;
  scrollbarPosition?: TScrollAreaScrollbarPosition;
  scrollbarDirection?: TScrollAreaScrollbarDirection;
  slotProps?: TScrollAreaSlotProps;
};

export type TSScrollAreaFadeProps = {
  fade: boolean;
};

export type TSScrollAreaViewportProps = {
  axis: TScrollAreaScrollbarDirection;
};

export type TSScrollAreaScrollbarProps = {
  origin: TScrollAreaScrollbarY | TScrollAreaScrollbarX;
  axis: 'y' | 'x';
};
