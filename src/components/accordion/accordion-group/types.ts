import { HTMLAttributes, ReactNode } from 'react';
import { TThemeRadius } from '../../../theme/types';

export type TAccordionGroupRadius = keyof TThemeRadius;

export type TAccordionGroupProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  children?: ReactNode;
  radius?: TAccordionGroupRadius;
};

export type TSAccordionGroupProps = {
  radius: TAccordionGroupRadius;
};
