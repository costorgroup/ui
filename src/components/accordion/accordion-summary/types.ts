import { ButtonHTMLAttributes, ReactNode } from 'react';
import { TAccordionVariant } from '../accordion-base/context';

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
  expandIconPosition: TAccordionExpandIconPosition;
  expanded: boolean;
  variant: TAccordionVariant;
};

export type TSAccordionExpandIconProps = {
  expanded: boolean;
  variant: TAccordionVariant;
};
