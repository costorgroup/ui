import { ReactNode } from 'react';
import { TGap } from '../../theme/types';

export type TFloatingActionsPosition =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'left'
  | 'right'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right';

export type TFloatingActionsItemsDirection = 'vertical' | 'horizontal';

export type TFloatingActionsInset = TGap | number | (string & {});

export type TFloatingActionsProviderProps = {
  children?: ReactNode;
  position?: TFloatingActionsPosition;
  itemsDirection?: TFloatingActionsItemsDirection;
  offset?: TFloatingActionsInset;
};
