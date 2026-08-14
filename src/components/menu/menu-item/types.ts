import { ButtonHTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../theme/types';

export type TMenuItemProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'color'
> & {
  children?: ReactNode;
  color?: TPaletteColor;
  disabled?: boolean;
};

export type TSMenuItemProps = {
  color: TPaletteColor;
  hasSubmenu: boolean;
};
