import { TSpeedDialItemsDirection } from './types';

export type TSpeedDialLayout = {
  flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  itemsDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse';
};

export const speedDialLayout: Record<TSpeedDialItemsDirection, TSpeedDialLayout> =
  {
    top: {
      flexDirection: 'column-reverse',
      itemsDirection: 'column-reverse',
    },
    bottom: {
      flexDirection: 'column',
      itemsDirection: 'column',
    },
    left: {
      flexDirection: 'row-reverse',
      itemsDirection: 'row-reverse',
    },
    right: {
      flexDirection: 'row',
      itemsDirection: 'row',
    },
  };
