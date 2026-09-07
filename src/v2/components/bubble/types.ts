import { ElementType, HTMLAttributes, MouseEvent, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../../helpers/polymorphic';
import { TPaletteColor } from '../../../theme/types';
import type { TInteractiveVariant } from '../../variant-types';

export type TBubbleVariant = TInteractiveVariant;
export type TBubbleAlign = 'start' | 'end';
export type TBubbleReactionSide = 'top' | 'bottom';

export type TBubbleProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  children?: ReactNode;
  color?: TPaletteColor;
  variant?: TBubbleVariant;
  align?: TBubbleAlign;
  onReactionsClick?: (event: MouseEvent<HTMLDivElement>) => void;
};

export type TSBubbleProps = {
  align: TBubbleAlign;
  variant: TBubbleVariant;
};

export type TBubbleContentOwnProps = {
  children?: ReactNode;
};

export type TBubbleContentProps<C extends ElementType = 'div'> =
  TPolymorphicProps<C, TBubbleContentOwnProps>;

export type TSBubbleContentProps = {
  color: TPaletteColor;
  variant: TBubbleVariant;
};

export type TBubbleGroupProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export type TBubbleActionProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export type TSBubbleActionProps = {
  align: TBubbleAlign;
};

export type TBubbleReactionsProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  side?: TBubbleReactionSide;
  align?: TBubbleAlign;
  onReactionsClick?: (event: MouseEvent<HTMLDivElement>) => void;
};

export type TSBubbleReactionsProps = {
  side: TBubbleReactionSide;
  align: TBubbleAlign;
};
