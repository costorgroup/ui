import { HTMLAttributes, ReactNode } from 'react';
import type { TPanelElevation, TPanelRadius, TPanelVariant } from '../panel/types';

export type TViewportRadius = TPanelRadius;
export type TViewportVariant = TPanelVariant;

export type TViewportProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  children?: ReactNode;
  radius?: TViewportRadius;
  variant?: TViewportVariant;
  elevation?: TPanelElevation;
};
