import { HTMLAttributes, ReactNode } from 'react';
import { TAvatarRadius, TAvatarSize } from '../avatar/types';
import { TAvatarGroupSpacing } from '../avatar/context';
import type { TSlotProps } from '../../helpers/slot-props';
import type { TAvatarProps } from '../avatar/types';

export type TAvatarGroupSlotProps = TSlotProps<{
  surplus: TAvatarProps;
}>;

export type TAvatarGroupRootProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  children?: ReactNode;
  max?: number;
  total?: number;
  spacing?: TAvatarGroupSpacing;
  size?: TAvatarSize;
  radius?: TAvatarRadius;
  renderSurplus?: (surplus: number) => ReactNode;
  slotProps?: TAvatarGroupSlotProps;
};
