import { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { TPaletteColor } from '../../../theme/types';
import type { TStaticVariant } from '../../variant-types';

export type TTooltipVariant = TStaticVariant;

export type TTooltipPlacement =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'left-start'
  | 'left'
  | 'left-end'
  | 'right-start'
  | 'right'
  | 'right-end';

export type TTooltipRenderProps = {
  placement: TTooltipPlacement;
};

export type TTooltipRender = (props: TTooltipRenderProps) => ReactNode;

type TTooltipPropsBase = Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'color'> & {
  children: ReactElement;
  placement?: TTooltipPlacement;
  offset?: number;
  variant?: TTooltipVariant;
  color?: TPaletteColor;
};

export type TTooltipProps =
  | (TTooltipPropsBase & { title: ReactNode; render?: never })
  | (TTooltipPropsBase & { title?: ReactNode; render: TTooltipRender });

export type TSTooltipContentProps = {
  top: number;
  left: number;
  placement: TTooltipPlacement;
  visible: boolean;
};

export type TSTooltipPanelProps = {
  variant: TTooltipVariant;
  color: TPaletteColor;
};
