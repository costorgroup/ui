import { HTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import { TPaletteColor, TThemeRadius } from '../../theme/types';
import type { TAppearance, TInteractiveVariant } from '../../helpers/variant-styles/types';
import type { TSlotProps } from '../../helpers/slot-props';
import type { TIconButtonProps } from '../icon-button/types';

export type TChipVariant = TInteractiveVariant;
export type TChipAppearance = TAppearance;
export type TChipRadius = keyof TThemeRadius;
export type TChipSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TChipSlotProps = TSlotProps<{
  deleteButton: TIconButtonProps;
}>;

export type TChipProps = Omit<HTMLAttributes<HTMLSpanElement>, 'color'> & {
  children?: ReactNode;
  variant?: TChipVariant;
  appearance?: TChipAppearance;
  size?: TChipSize;
  color?: TPaletteColor;
  radius?: TChipRadius;
  disabled?: boolean;
  onDelete?: MouseEventHandler<HTMLButtonElement>;
  slotProps?: TChipSlotProps;
};
