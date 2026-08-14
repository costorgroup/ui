import { HTMLAttributes } from 'react';
import { TThemeRadius } from '../../theme/types';

export type TSkeletonRadius = keyof TThemeRadius;
export type TSkeletonAnimation = 'pulse' | 'wave' | false;

export type TSkeletonProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  width?: number | string;
  height?: number | string;
  radius?: TSkeletonRadius;
  animation?: TSkeletonAnimation;
  animationOffset?: number | string;
};

export type TSSkeletonProps = {
  width?: number | string;
  height?: number | string;
  radius: TSkeletonRadius;
  animation: Exclude<TSkeletonAnimation, false> | 'none';
  animationOffset: string;
};
