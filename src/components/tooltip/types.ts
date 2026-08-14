import { HTMLAttributes, ReactElement, ReactNode } from 'react';

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

export type TTooltipProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  children: ReactElement;
  render: TTooltipRender;
  placement?: TTooltipPlacement;
  offset?: number;
};

export type TSTooltipContentProps = {
  top: number;
  left: number;
  placement: TTooltipPlacement;
  visible: boolean;
};
