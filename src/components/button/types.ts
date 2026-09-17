import { ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../helpers/polymorphic';
import { TPaletteColor, TThemeRadius } from '../../theme/types';
import type { TAppearance, TInteractiveVariant } from '../../helpers/variant-styles/types';

export type TButtonVariant = TInteractiveVariant;
export type TButtonAppearance = TAppearance;
export type TButtonRadius = keyof TThemeRadius;

export type TButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TButtonOwnProps = {
  children?: ReactNode;
  variant?: TButtonVariant;
  appearance?: TButtonAppearance;
  size?: TButtonSize;
  color?: TPaletteColor;
  radius?: TButtonRadius;
};

export type TButtonProps<C extends ElementType = 'button'> = TPolymorphicProps<
  C,
  TButtonOwnProps
>;
