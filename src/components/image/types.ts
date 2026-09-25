import { HTMLAttributes, ImgHTMLAttributes } from 'react';
import { TThemeRadius } from '../../theme/types';
import type { TSlotProps } from '../../helpers/slot-props';

export type TImageRadius = keyof TThemeRadius;
export type TImageAnimation = 'fade' | 'zoom';

export type TImageSlotProps = TSlotProps<{
  root: HTMLAttributes<HTMLSpanElement>;
  fallback: HTMLAttributes<HTMLSpanElement>;
  media: HTMLAttributes<HTMLSpanElement>;
}>;

export type TImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'width' | 'height' | 'children'
> & {
  src?: string | null;
  width?: number | string;
  height?: number | string;
  radius?: TImageRadius;
  animation?: TImageAnimation;
  slotProps?: TImageSlotProps;
};

export type TSImageProps = {
  width?: number | string;
  height?: number | string;
  radius?: TImageRadius;
  showFallback: boolean;
};

export type TSImageMediaProps = {
  animation?: TImageAnimation;
  visible: boolean;
};
