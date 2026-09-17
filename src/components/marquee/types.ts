import { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { TGap } from '../../theme/types';

export type TMarqueeDirection = 'left' | 'right' | 'top' | 'bottom';
export type TMarqueeGap = TGap | number | (string & {});

export type TMarqueeProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  children?: ReactNode;
  /** Autoplay and layout axis. Drag still follows the pointer. */
  direction?: TMarqueeDirection;
  gap?: TMarqueeGap;
  autoPlay?: boolean;
  /** Pixels per second. Ignored when `autoPlay` is false. */
  speed?: number;
  /** Initial shift along the travel axis, in pixels. */
  offset?: number;
  pauseOnHover?: boolean;
  paused?: boolean;
  align?: CSSProperties['alignItems'];
};

export type TSMarqueeProps = {
  direction: TMarqueeDirection;
  gap?: TMarqueeGap;
  align?: CSSProperties['alignItems'];
};
