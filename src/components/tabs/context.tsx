import { createContext, useContext } from 'react';
import { TPaletteColor } from '../../theme/types';
import type { TAppearance } from '../../helpers/variant-styles/types';

export type TTabsOrientation = 'horizontal' | 'vertical';

export type TTabsAppearance = TAppearance;

export type TTabsVariant = 'subtle' | 'surface' | 'plain';

export type TTabsContextValue = {
  orientation: TTabsOrientation;
  appearance: TTabsAppearance;
  variant: TTabsVariant;
  fullWidth: boolean;
  draggable: boolean;
  dragging: boolean;
  dragHoverValue: string | null;
  color?: TPaletteColor;
  value: string | undefined;
  onSelect: (value: string) => void;
  registerTab: (value: string, node: HTMLButtonElement | null) => void;
  startIndicatorDrag: (clientX: number, clientY: number) => void;
};

export const TabsContext = createContext<TTabsContextValue | null>(null);

export const useTabsContext = () => {
  const context = useContext(TabsContext);

  if (context == null) {
    throw new Error('Tab must be used within Tabs.');
  }

  return context;
};
