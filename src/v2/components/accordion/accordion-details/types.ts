import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../../theme/types';
import { TAccordionVariant } from '../variant-styles';
import { TAccordionSize } from '../accordion-base/context';

export type TAccordionDetailsProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export type TSAccordionDetailsProps = {
  expanded: boolean;
};

export type TSAccordionDetailsInnerProps = {
  size: TAccordionSize;
  variant: TAccordionVariant;
  color: TPaletteColor;
};
