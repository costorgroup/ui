import { HTMLAttributes, ReactNode } from 'react';
import { TThemeRadius } from '../../../theme/types';
import { TAnimatedPlayMode } from '../types';

export type TNeonPulseProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  play?: TAnimatedPlayMode;
  color?: string;
  thickness?: number;
  duration?: number;
  radius?: keyof TThemeRadius;
};

export type TSNeonPulseProps = {
  color: string;
  thickness: number;
  duration: number;
  radius: keyof TThemeRadius;
};
