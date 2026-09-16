import {
  HTMLAttributes,
  ImgHTMLAttributes,
  ReactNode,
  VideoHTMLAttributes,
} from 'react';

export type TMediaViewerType = 'image' | 'video';

export type TMediaViewerItem = {
  src: string;
  thumbnail?: string;
  type?: TMediaViewerType;
  alt?: string;
  caption?: ReactNode;
  [key: string]: unknown;
};

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
