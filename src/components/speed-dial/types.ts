import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { TGap, TPaletteColor } from '../../theme/types';
import {
  TIconButtonAppearance,
  TIconButtonRadius,
  TIconButtonSize,
  TIconButtonVariant,
} from '../icon-button/types';
import type { TSlotProps } from '../../helpers/slot-props';
import type { TIconButtonProps } from '../icon-button/types';

export type TSpeedDialItemsDirection = 'left' | 'top' | 'right' | 'bottom';

export type TSpeedDialInset = TGap | number | (string & {});

export type TSpeedDialSlotProps = TSlotProps<{
  trigger: TIconButtonProps;
  triggerIcon: HTMLAttributes<HTMLSpanElement>;
  items: HTMLAttributes<HTMLDivElement>;
}>;

export type TSpeedDialProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  children?: ReactNode;
  icon?: ReactNode;
  itemsDirection?: TSpeedDialItemsDirection;
  itemsGap?: TSpeedDialInset;
  gap?: TSpeedDialInset;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  color?: TPaletteColor;
  size?: TIconButtonSize;
  variant?: TIconButtonVariant;
  appearance?: TIconButtonAppearance;
  radius?: TIconButtonRadius;
  disabled?: boolean;
  triggerProps?: Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'color' | 'type'
  >;
  slotProps?: TSpeedDialSlotProps;
};
