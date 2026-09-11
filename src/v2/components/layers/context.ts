import { createContext, useContext } from 'react';
import { TLayersRadius, TLayersSpread } from './types';

export type TLayersContextValue = {
  count: number;
  radius: TLayersRadius;
  spread: TLayersSpread;
};

export const LayersContext = createContext<TLayersContextValue | null>(null);

export const useLayersContext = () => useContext(LayersContext);
