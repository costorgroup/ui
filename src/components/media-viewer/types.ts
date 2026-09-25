import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ImgHTMLAttributes,
  ReactNode,
  VideoHTMLAttributes,
} from 'react';
import type { TSlotProps } from '../../helpers/slot-props';
import type { TBackdropProps } from '../backdrop/types';
import type { TDockProps } from '../dock/types';

export type TMediaViewerType = 'image' | 'video';

export type TMediaViewerItem = {
  src: string;
  thumbnail?: string;
  type?: TMediaViewerType;
  alt?: string;
  caption?: ReactNode;
  [key: string]: unknown;
};

export type TMediaViewerSlotProps = TSlotProps<{
  backdrop: TBackdropProps;
  stage: HTMLAttributes<HTMLDivElement>;
  frame: HTMLAttributes<HTMLDivElement>;
  video: VideoHTMLAttributes<HTMLVideoElement>;
  image: ImgHTMLAttributes<HTMLImageElement>;
  chrome: HTMLAttributes<HTMLDivElement>;
  caption: HTMLAttributes<HTMLDivElement>;
  gallery: HTMLAttributes<HTMLDivElement>;
  track: HTMLAttributes<HTMLDivElement>;
  thumb: ButtonHTMLAttributes<HTMLButtonElement>;
  toolbar: TDockProps;
}>;

export type TMediaViewerProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'onChange' | 'children'
> & {
  items?: TMediaViewerItem[];
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;
  videoProps?: Omit<VideoHTMLAttributes<HTMLVideoElement>, 'src'>;
  slotProps?: TMediaViewerSlotProps;
};

export type TSMediaViewerThumbProps = {
  selected: boolean;
};

export type TSMediaViewerTrackProps = {
  offset: number;
  ready: boolean;
};

export type TSMediaViewerPanProps = {
  canPan: boolean;
  grabbing: boolean;
  animated: boolean;
};

export type TSMediaViewerFitProps = {
  ready: boolean;
};
