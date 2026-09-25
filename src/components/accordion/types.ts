import { HTMLAttributes, ReactNode, SyntheticEvent } from 'react';
import { TPaletteColor, TThemeRadius } from '../../theme/types';
import type { TAccordionExpandIconPosition } from './accordion-summary/types';
import type { TAccordionSize } from './accordion-base/context';
import type {
  TAccordionColorScope,
  TAccordionVariant,
} from './variant-styles';
import type { TSlotProps } from '../../helpers/slot-props';
import type { TAccordionSummaryProps } from './accordion-summary/types';
import type { TAccordionDetailsProps } from './accordion-details/types';

export type TAccordionRadius = keyof TThemeRadius;

export type TAccordionSlotProps = TSlotProps<{
  summary: TAccordionSummaryProps;
  details: TAccordionDetailsProps;
}>;

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
  slotProps?: TAccordionSlotProps;
};

export type { TAccordionSize } from './accordion-base/context';
export type { TAccordionExpandIconPosition } from './accordion-summary/types';
