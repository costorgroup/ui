import { createContext, useContext } from 'react';
import { TLayoutDirection } from './types';

export type TLayoutContextValue = {
  direction: TLayoutDirection;
  divider: boolean;
};

export const LayoutContext = createContext<TLayoutContextValue | null>(null);

export const useLayoutContext = () => useContext(LayoutContext);
