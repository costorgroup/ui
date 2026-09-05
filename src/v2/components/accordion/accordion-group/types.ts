import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../../theme/types';
import { TWindowRadius } from '../../window/types';
import { TAccordionSize } from '../accordion-base/context';
import { TAccordionVariant } from '../variant-styles';

export type TAccordionGroupRadius = TWindowRadius;

export type TAccordionGroupProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'children'
> & {
  children?: ReactNode;
  color?: TPaletteColor;
  variant?: TAccordionVariant;
  size?: TAccordionSize;
  radius?: TAccordionGroupRadius;
};

export type TSAccordionGroupProps = {
  radius: TAccordionGroupRadius;
};
