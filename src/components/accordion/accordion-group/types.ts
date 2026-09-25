import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  SyntheticEvent,
} from 'react';
import type { TPaletteColor } from '../../../theme/types';
import type { TSlotProps } from '../../../helpers/slot-props';
import type { TAccordionSize } from '../accordion-base/context';
import type { TAccordionRadius } from '../types';
import type {
  TAccordionAppearance,
  TAccordionColorScope,
  TAccordionVariant,
} from '../variant-styles';

export type TAccordionGroupRadius = TAccordionRadius;

export type TAccordionGroupSlotProps = TSlotProps<{
  list: Omit<HTMLAttributes<HTMLDivElement>, 'onDrop' | 'color'>;
  empty: HTMLAttributes<HTMLDivElement>;
  add: ButtonHTMLAttributes<HTMLButtonElement>;
}>;

export type TAccordionGroupProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'children' | 'defaultValue'
> & {
  children?: ReactNode;
  color?: TPaletteColor;
  variant?: TAccordionVariant;
  size?: TAccordionSize;
  radius?: TAccordionGroupRadius;
  colorScope?: TAccordionColorScope;
  forceContrastText?: boolean;
  /** Tints mix onto the theme canvas (`opaque`, default) or onto transparent. */
  appearance?: TAccordionAppearance;
  /** Only one item open at a time. Items are matched by their `value`. */
  exclusive?: boolean;
  /** Open item's `value` (controlled); `null` closes all. Implies `exclusive`. */
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (event: SyntheticEvent, value: string | null) => void;
  /** Makes items draggable by a grip on their summary. */
  onReorder?: (fromIndex: number, toIndex: number) => void;
  /** Shows an add row at the bottom of the group. */
  onAdd?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Accessible name of the add row. */
  addLabel?: string;
  /** Add row content; a plus icon by default. */
  addIcon?: ReactNode;
  /** Shown above the add row while the group has no items. */
  empty?: ReactNode;
  slotProps?: TAccordionGroupSlotProps;
};

export type TSAccordionGroupProps = {
  radius: TAccordionGroupRadius;
};

export type TSAccordionGroupAddProps = {
  appearance: TAccordionAppearance;
  paletteColor: TPaletteColor;
  size: TAccordionSize;
};
