import { TSpeedDialItemsDirection } from './types';

export type TSpeedDialLayout = {
  flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  itemsDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  itemOffset: string;
};

export const speedDialLayout: Record<
  TSpeedDialItemsDirection,
  TSpeedDialLayout
> = {
  top: {
    flexDirection: 'column-reverse',
    itemsDirection: 'column-reverse',
    itemOffset: 'translateY(16px)',
  },
  bottom: {
    flexDirection: 'column',
    itemsDirection: 'column',
    itemOffset: 'translateY(-16px)',
  },
  left: {
    flexDirection: 'row-reverse',
    itemsDirection: 'row-reverse',
    itemOffset: 'translateX(16px)',
  },
  right: {
    flexDirection: 'row',
    itemsDirection: 'row',
    itemOffset: 'translateX(-16px)',
  },
};
