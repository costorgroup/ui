import {
  TFloatingItemsDirection,
  TFloatingNaturalDirection,
  TFloatingPosition,
} from './types';

export type TFloatingLayout = {
  flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse';
};

export const floatingLayout: Record<
  TFloatingPosition,
  Record<TFloatingItemsDirection, TFloatingLayout>
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
  position: TFloatingPosition,
  itemsDirection: TFloatingItemsDirection,
): TFloatingNaturalDirection => {
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
