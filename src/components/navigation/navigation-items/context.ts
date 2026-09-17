import { createContext } from 'react';

export type TNavigationItemsContextValue = {
  openId: string | null;
  setOpenId: (id: string | null) => void;
};

export const NavigationItemsContext =
  createContext<TNavigationItemsContextValue | null>(null);
