import { HTMLAttributes, ReactNode } from 'react';
import { TAvatarRadius, TAvatarSize } from '../avatar/types';
import { TAvatarGroupSpacing } from '../avatar/context';

export type TAvatarGroupRootProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  children?: ReactNode;
  max?: number;
  total?: number;
  spacing?: TAvatarGroupSpacing;
  size?: TAvatarSize;
  radius?: TAvatarRadius;
  renderSurplus?: (surplus: number) => ReactNode;
};
