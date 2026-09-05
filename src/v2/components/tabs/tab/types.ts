import { ButtonHTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../../theme/types';
import { TTabsAppearance, TTabsOrientation } from '../context';

export type TTabProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'value' | 'color' | 'draggable'
> & {
  value: string;
  children?: ReactNode;
};

export type STabProps = {
  active: boolean;
  appearance: TTabsAppearance;
  orientation: TTabsOrientation;
  fullWidth: boolean;
  draggable: boolean;
  dragging: boolean;
  selected: boolean;
  color?: TPaletteColor;
};
