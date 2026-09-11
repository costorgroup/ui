import { createContext, useContext } from 'react';
import { TDockOrientation } from './types';

export type TDockContextValue = {
  orientation: TDockOrientation;
};

export const DockContext = createContext<TDockContextValue | null>(null);

export const useDockContext = () => useContext(DockContext);
