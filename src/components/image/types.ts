import { ImgHTMLAttributes } from 'react';
import { TThemeRadius } from '../../theme/types';

export type TImageRadius = keyof TThemeRadius;
export type TImageAnimation = 'fade' | 'zoom';

export type TImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'width' | 'height' | 'children'
> & {
  src?: string | null;
  width?: number | string;
  height?: number | string;
  radius?: TImageRadius;
  animation?: TImageAnimation;
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
