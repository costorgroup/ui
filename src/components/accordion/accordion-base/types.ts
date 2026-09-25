import { HTMLAttributes, ReactNode, SyntheticEvent } from 'react';
import type { TPaletteColor } from '../../../theme/types';
import type { TAccordionRadius } from '../types';
import type {
  TAccordionAppearance,
  TAccordionColorScope,
  TAccordionVariant,
} from '../variant-styles';
import type { TAccordionSize } from './context';

export type TAccordionBaseProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'children' | 'color'
> & {
  children?: ReactNode;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onChange?: (event: SyntheticEvent, expanded: boolean) => void;
  /** Identifies the item in an `exclusive` AccordionGroup. */
  value?: string;
  disabled?: boolean;
  color?: TPaletteColor;
  variant?: TAccordionVariant;
  size?: TAccordionSize;
  radius?: TAccordionRadius;
  hasDetails?: boolean;
  /** What takes the color on expand: `all`, `summary` or `none`. */
  colorScope?: TAccordionColorScope;
  /** Pins text/icon to `palette.contrastText`, same as Button. */
  forceContrastText?: boolean;
  /** Tints mix onto the theme canvas (`opaque`, default) or onto transparent. */
  appearance?: TAccordionAppearance;
};

export type TSAccordionBaseProps = {
  radius: TAccordionRadius;
  size: TAccordionSize;
  expanded: boolean;
  disabled: boolean;
  color: TPaletteColor;
  variant: TAccordionVariant;
  grouped: boolean;
  colorScope: TAccordionColorScope;
  forceContrastText: boolean;
  appearance: TAccordionAppearance;
};
