import { ReactNode } from 'react';
import { TGap } from '../../theme/types';

export type TFloatingPosition =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'left'
  | 'right'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right';

export type TFloatingItemsDirection = 'vertical' | 'horizontal';

export type TFloatingNaturalDirection =
  | 'left'
  | 'top'
  | 'right'
  | 'bottom';

export type TFloatingInset = TGap | number | (string & {});

export type TFloatingProviderProps = {
  children?: ReactNode;
  position?: TFloatingPosition;
  itemsDirection?: TFloatingItemsDirection;
  offset?: TFloatingInset;
};
