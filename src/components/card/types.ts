import { HTMLAttributes, ReactNode } from 'react';
import type { TPanelElevation, TPanelRadius, TPanelVariant } from '../panel/types';

export type TCardSize = 'sm' | 'md' | 'lg';

export type TCardProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  children?: ReactNode;
  elevation?: TPanelElevation;
  variant?: TPanelVariant;
  radius?: TPanelRadius;
  size?: TCardSize;
};

export type TSCardProps = {
  elevation: TPanelElevation;
  variant: TPanelVariant;
  radius: TPanelRadius;
  size: TCardSize;
};
