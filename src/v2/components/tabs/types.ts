import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TTabsAppearance, TTabsOrientation } from './context';

export type TTabsProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'color'> & {
  children?: ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  orientation?: TTabsOrientation;
  /** `solid` for light surfaces; `transparent` for frosted windows. */
  appearance?: TTabsAppearance;
  fullWidth?: boolean;
  /** Drag the active indicator to switch tabs. */
  draggable?: boolean;
  /** Active indicator / label color. Omit for theme contrast pill. */
  color?: TPaletteColor;
};

export type STTabIndicatorProps = {
  appearance: TTabsAppearance;
  color?: TPaletteColor;
  width: number;
  height: number;
  x: number;
  y: number;
  ready: boolean;
  dragging: boolean;
};

export type STTabsProps = {
  orientation: TTabsOrientation;
  appearance: TTabsAppearance;
  fullWidth: boolean;
  dragging: boolean;
  color?: TPaletteColor;
};
