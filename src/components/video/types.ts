import { VideoHTMLAttributes } from 'react';
import { TPaletteColor, TThemeRadius } from '../../theme/types';

export type TVideoRadius = keyof TThemeRadius;

export type TVideoProps = Omit<
  VideoHTMLAttributes<HTMLVideoElement>,
  'controls' | 'width' | 'height' | 'color'
> & {
  width?: number | string;
  height?: number | string;
  radius?: TVideoRadius;
  color?: TPaletteColor;
  controls?: boolean;
  autoHide?: boolean;
};

export type TSVideoProps = {
  width?: number | string;
  height?: number | string;
  radius: TVideoRadius;
  color: TPaletteColor;
};
