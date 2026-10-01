import { createContext, useContext } from 'react';
import { TSidebarShowTrailing } from '../types';

export type TSidebarItemContextValue = {
  showTrailing: TSidebarShowTrailing;
};

export const SidebarItemContext =
  createContext<TSidebarItemContextValue | null>(null);

export const useSidebarItemContext = () => useContext(SidebarItemContext);
