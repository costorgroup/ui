import { ButtonHTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TAccordionVariant } from '../variant-styles';
import { TAccordionSize } from '../accordion-base/context';

export type TAccordionExpandIconPosition = 'left' | 'right';

export type TAccordionSummaryProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> & {
  children?: ReactNode;
  expandIcon?: ReactNode;
  expandIconPosition?: TAccordionExpandIconPosition;
};

export type TSAccordionSummaryProps = {
  paletteColor: TPaletteColor;
  variant: TAccordionVariant;
  expanded: boolean;
  disabled: boolean;
  expandIconPosition: TAccordionExpandIconPosition;
  size: TAccordionSize;
  hasDetails: boolean;
};

export type TSAccordionExpandIconProps = {
  expanded: boolean;
};
