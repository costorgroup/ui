import { TSpeedDialItemsDirection } from '../../components/speed-dial/types';
import {
  TFloatingActionsItemsDirection,
  TFloatingActionsPosition,
} from './types';

export type TFloatingActionsLayout = {
  flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse';
};

export const floatingActionsLayout: Record<
  TFloatingActionsPosition,
  Record<TFloatingActionsItemsDirection, TFloatingActionsLayout>
> = {
  'bottom-left': {
    vertical: { flexDirection: 'column-reverse' },
    horizontal: { flexDirection: 'row' },
  },
  'bottom-right': {
    vertical: { flexDirection: 'column-reverse' },
    horizontal: { flexDirection: 'row-reverse' },
  },
  'top-left': {
    vertical: { flexDirection: 'column' },
    horizontal: { flexDirection: 'row' },
  },
  'top-right': {
    vertical: { flexDirection: 'column' },
    horizontal: { flexDirection: 'row-reverse' },
  },
  top: {
    vertical: { flexDirection: 'column' },
    horizontal: { flexDirection: 'row' },
  },
  bottom: {
    vertical: { flexDirection: 'column-reverse' },
    horizontal: { flexDirection: 'row' },
  },
  left: {
    vertical: { flexDirection: 'column' },
    horizontal: { flexDirection: 'row' },
  },
  right: {
    vertical: { flexDirection: 'column' },
    horizontal: { flexDirection: 'row-reverse' },
  },
};

export const naturalItemsDirectionFor = (
  position: TFloatingActionsPosition,
  itemsDirection: TFloatingActionsItemsDirection,
): TSpeedDialItemsDirection => {
  if (itemsDirection === 'horizontal') {
    switch (position) {
      case 'top':
      case 'top-left':
      case 'top-right':
        return 'bottom';
      case 'bottom':
      case 'bottom-left':
      case 'bottom-right':
        return 'top';
      default:
        return 'top';
    }
  }

  switch (position) {
    case 'left':
    case 'top-left':
    case 'bottom-left':
      return 'right';
    case 'right':
    case 'top-right':
    case 'bottom-right':
      return 'left';
    default:
      return 'right';
  }
};
