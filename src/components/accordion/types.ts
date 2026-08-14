import { HTMLAttributes, ReactNode, SyntheticEvent } from 'react';
import type { TAccordionExpandIconPosition } from './accordion-summary/types';
import type {
  TAccordionSize,
  TAccordionVariant,
} from './accordion-base/context';
import type { TPaletteColor } from '../../theme/types';

export type TAccordionProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'children' | 'color' | 'summary'
> & {
  summary: ReactNode;
  icon?: ReactNode;
  expandIconPosition?: TAccordionExpandIconPosition;
  children?: ReactNode;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onChange?: (event: SyntheticEvent, expanded: boolean) => void;
  disabled?: boolean;
  color?: TPaletteColor;
  variant?: TAccordionVariant;
  size?: TAccordionSize;
};
