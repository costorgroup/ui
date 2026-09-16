import { createContext, useContext } from 'react';
import { TDockOrientation, TDockSize } from './types';

export type TDockContextValue = {
  orientation: TDockOrientation;
  size: TDockSize;
};

export const DockContext = createContext<TDockContextValue | null>(null);

export const useDockContext = () => useContext(DockContext);
