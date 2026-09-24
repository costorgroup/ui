import { HTMLAttributes, ReactNode, SyntheticEvent } from 'react';
import type { TPaletteColor } from '../../../theme/types';
import type { TAccordionRadius } from '../types';
import type {
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
  disabled?: boolean;
  color?: TPaletteColor;
  variant?: TAccordionVariant;
  size?: TAccordionSize;
  radius?: TAccordionRadius;
  hasDetails?: boolean;
  /** `all` colors the whole accordion, `summary` only the summary row. */
  colorScope?: TAccordionColorScope;
  /** Pins text/icon to `palette.contrastText`, same as Button. */
  forceContrastText?: boolean;
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
};
