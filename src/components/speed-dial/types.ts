import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { TGap, TPaletteColor } from '../../theme/types';
import { TIconButtonSize, TIconButtonVariant } from '../icon-button/types';

export type TSpeedDialItemsDirection = 'left' | 'top' | 'right' | 'bottom';

export type TSpeedDialInset = TGap | number | (string & {});

export type TSpeedDialProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  children?: ReactNode;
  icon?: ReactNode;
  closeIcon?: ReactNode;
  itemsDirection?: TSpeedDialItemsDirection;
  itemsGap?: TSpeedDialInset;
  gap?: TSpeedDialInset;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  color?: TPaletteColor;
  size?: TIconButtonSize;
  variant?: TIconButtonVariant;
  disabled?: boolean;
  triggerProps?: Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'color' | 'type'
  >;
};
