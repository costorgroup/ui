import { HTMLAttributes, ReactNode } from 'react';
import type { TThemeRadius } from '../../theme/types';

export type TPanelRadius = keyof TThemeRadius;
export type TPanelVariant = 'subtle' | 'surface' | 'outline';
export type TPanelElevation = number;

export type TPanelProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  children?: ReactNode;
  elevation?: TPanelElevation;
  variant?: TPanelVariant;
  radius?: TPanelRadius;
  fullWidth?: boolean;
};

export type TSPanelProps = {
  elevation: TPanelElevation;
  variant: TPanelVariant;
  radius: TPanelRadius;
  fullWidth: boolean;
};
