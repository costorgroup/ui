import { HTMLAttributes, ReactNode, SyntheticEvent } from 'react';
import { TPaletteColor, TThemeRadius } from '../../theme/types';
import type { TAccordionExpandIconPosition } from './accordion-summary/types';
import type { TAccordionSize } from './accordion-base/context';
import type {
  TAccordionColorScope,
  TAccordionVariant,
} from './variant-styles';

export type TAccordionRadius = keyof TThemeRadius;

export type TAccordionProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'children' | 'summary' | 'color'
> & {
  summary: ReactNode;
  children?: ReactNode;
  icon?: ReactNode;
  expandIconPosition?: TAccordionExpandIconPosition;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onChange?: (event: SyntheticEvent, expanded: boolean) => void;
  disabled?: boolean;
  color?: TPaletteColor;
  variant?: TAccordionVariant;
  size?: TAccordionSize;
  radius?: TAccordionRadius;
  /** `all` colors the whole accordion, `summary` only the summary row. */
  colorScope?: TAccordionColorScope;
  /** Pins text/icon to `palette.contrastText`, same as Button. */
  forceContrastText?: boolean;
};

export type { TAccordionSize } from './accordion-base/context';
export type { TAccordionExpandIconPosition } from './accordion-summary/types';
