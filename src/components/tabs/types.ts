import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../theme/types';
import { TTabsAppearance, TTabsOrientation, TTabsVariant } from './context';
import type { TSlotProps } from '../../helpers/slot-props';

export type { TTabsVariant };

export type TTabsSlotProps = TSlotProps<{
  list: HTMLAttributes<HTMLDivElement>;
  indicator: HTMLAttributes<HTMLSpanElement>;
  fade: HTMLAttributes<HTMLSpanElement>;
}>;

export type TTabsProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'color'> & {
  children?: ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  orientation?: TTabsOrientation;
  /** `opaque` mixes onto `surfaces.background`; `transparent` mixes onto air. */
  appearance?: TTabsAppearance;
  /** `subtle` is fill only; `surface` adds a border; `plain` has no track. Active tab is solid in all. */
  variant?: TTabsVariant;
  fullWidth?: boolean;
  /** Drag the active indicator to switch tabs. */
  draggable?: boolean;
  /** Active indicator / label color. Omit for theme contrast pill. */
  color?: TPaletteColor;
  slotProps?: TTabsSlotProps;
};

export type STTabIndicatorProps = {
  appearance: TTabsAppearance;
  variant: TTabsVariant;
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
  variant: TTabsVariant;
  fullWidth: boolean;
  dragging: boolean;
};

export type STTabsFadeProps = {
  side: 'start' | 'end';
  orientation: TTabsOrientation;
  appearance: TTabsAppearance;
  variant: TTabsVariant;
  visible: boolean;
};
