import { HTMLAttributes, ReactNode } from 'react';
import type { TAppearance } from '../../helpers/variant-styles/types';
import type { TThemeRadius } from '../../theme/types';

export type TItemAppearance = TAppearance;
export type TItemRadius = keyof TThemeRadius;
export type TItemSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TItemDirection = 'horizontal' | 'vertical';

export type TItemProps = Omit<HTMLAttributes<HTMLDivElement>, 'color' | 'size'> & {
  children?: ReactNode;
  radius?: TItemRadius;
  appearance?: TItemAppearance;
  size?: TItemSize;
  direction?: TItemDirection;
};

export type TSItemProps = {
  radius: TItemRadius;
  appearance: TItemAppearance;
  size: TItemSize;
  direction: TItemDirection;
};
