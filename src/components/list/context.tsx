import { createContext, useContext } from 'react';
import { TPaletteColor } from '../../theme/types';
import { TListSize } from './types';
import { TListVariant } from './variant-styles';

export type TListContextValue = {
  color: TPaletteColor;
  variant: TListVariant;
  size: TListSize;
};

export const ListContext = createContext<TListContextValue | null>(null);

export const useListContext = () => useContext(ListContext);
