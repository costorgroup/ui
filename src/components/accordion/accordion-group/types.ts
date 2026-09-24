import { HTMLAttributes, ReactNode } from 'react';
import type { TPaletteColor } from '../../../theme/types';
import type { TAccordionSize } from '../accordion-base/context';
import type { TAccordionRadius } from '../types';
import type {
  TAccordionColorScope,
  TAccordionVariant,
} from '../variant-styles';

export type TAccordionGroupRadius = TAccordionRadius;

export type TAccordionGroupProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'children'
> & {
  children?: ReactNode;
  color?: TPaletteColor;
  variant?: TAccordionVariant;
  size?: TAccordionSize;
  radius?: TAccordionGroupRadius;
  colorScope?: TAccordionColorScope;
  forceContrastText?: boolean;
};

export type TSAccordionGroupProps = {
  radius: TAccordionGroupRadius;
};
