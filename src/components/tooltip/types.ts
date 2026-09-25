import { HTMLAttributes, ReactElement, ReactNode } from 'react';
import type { TSlotProps } from '../../helpers/slot-props';
import type { TPanelProps } from '../panel/types';

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

type TTooltipPropsBase = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'children' | 'color'
> & {
  children: ReactElement;
  placement?: TTooltipPlacement;
  offset?: number;
  slotProps?: TTooltipSlotProps;
};

export type TTooltipSlotProps = TSlotProps<{
  popper: HTMLAttributes<HTMLDivElement>;
  panel: TPanelProps;
}>;

export type TTooltipProps =
  | (TTooltipPropsBase & { title: ReactNode; render?: never })
  | (TTooltipPropsBase & { title?: ReactNode; render: TTooltipRender });

export type TSTooltipContentProps = {
  top: number;
  left: number;
  placement: TTooltipPlacement;
  visible: boolean;
};
