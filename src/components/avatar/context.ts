import { createContext, HTMLAttributes, ReactNode } from 'react';
import { TAvatarRadius, TAvatarSize } from './types';

export type TAvatarGroupSpacing = 'small' | 'medium' | number;

export type TAvatarGroupProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  children?: ReactNode;
  max?: number;
  total?: number;
  spacing?: TAvatarGroupSpacing;
  size?: TAvatarSize;
  radius?: TAvatarRadius;
  renderSurplus?: (surplus: number) => ReactNode;
};

export type TAvatarGroupContextValue = {
  size: TAvatarSize;
  radius: TAvatarRadius;
};

export const AvatarGroupContext = createContext<TAvatarGroupContextValue | null>(null);

export type TSAvatarGroupProps = {
  spacing: TAvatarGroupSpacing;
  size: TAvatarSize;
};
