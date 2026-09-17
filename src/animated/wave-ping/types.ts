import { HTMLAttributes, ReactNode } from 'react';
import { TThemeRadius } from '../../theme/types';
import { TAnimatedPlayMode } from '../types';

export type TWavePingProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  play?: TAnimatedPlayMode;
  color?: string;
  thickness?: number;
  duration?: number;
  spread?: number;
  radius?: keyof TThemeRadius;
};

export type TSWavePingProps = {
  color: string;
  thickness: number;
  duration: number;
  spread: number;
  radius: keyof TThemeRadius;
};

export type TSWavePingRingProps = {
  delay: number;
};
