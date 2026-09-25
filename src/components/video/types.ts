import { HTMLAttributes, VideoHTMLAttributes } from 'react';
import { TPaletteColor, TThemeRadius } from '../../theme/types';
import type { TSlotProps } from '../../helpers/slot-props';
import type { TDockProps } from '../dock/types';
import type { TDockItemProps } from '../dock/dock-item/types';

export type TVideoRadius = keyof TThemeRadius;

export type TVideoSlotProps = TSlotProps<{
  root: HTMLAttributes<HTMLDivElement>;
  overlay: HTMLAttributes<HTMLDivElement>;
  bigPlayButton: TDockItemProps;
  controls: HTMLAttributes<HTMLDivElement>;
  dock: TDockProps;
  playButton: TDockItemProps;
  time: HTMLAttributes<HTMLSpanElement>;
  progress: HTMLAttributes<HTMLDivElement>;
  volume: HTMLAttributes<HTMLDivElement>;
  muteButton: TDockItemProps;
  volumeTrack: HTMLAttributes<HTMLDivElement>;
  fullscreenButton: TDockItemProps;
}>;

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
  slotProps?: TVideoSlotProps;
};

export type TSVideoProps = {
  width?: number | string;
  height?: number | string;
  radius: TVideoRadius;
  color: TPaletteColor;
};
