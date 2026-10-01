import { createContext, useContext } from 'react';
import { TPaletteColor } from '../../theme/types';
import {
  TSidebarRadius,
  TSidebarShowTrailing,
  TSidebarSize,
  TSidebarVariant,
} from './types';

export type TSidebarContextValue = {
  size: TSidebarSize;
  color?: TPaletteColor;
  radius: TSidebarRadius;
  variant: TSidebarVariant;
  showTrailing: TSidebarShowTrailing;
  collapsed: boolean;
};

export const SidebarContext = createContext<TSidebarContextValue | null>(null);

export const useSidebarContext = () => useContext(SidebarContext);
