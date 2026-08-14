import { createContext, HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../theme/types';

export type TTabsVariant = 'line' | 'subtle' | 'enclosed' | 'outline' | 'plain';
export type TTabsAnchor = 'top' | 'bottom' | 'left' | 'right';
export type TTabsJustify = 'start' | 'center' | 'end' | 'stretch';
export type TTabsTextAlign = 'start' | 'center' | 'end';
export type TTabsSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TTabsBaseProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  children?: ReactNode;
  color?: TPaletteColor;
  variant?: TTabsVariant;
  anchor?: TTabsAnchor;
  justify?: TTabsJustify;
  textAlign?: TTabsTextAlign;
  size?: TTabsSize;
};

export type TTabsContextValue = {
  color: TPaletteColor;
  variant: TTabsVariant;
  anchor: TTabsAnchor;
  size: TTabsSize;
  textAlign: TTabsTextAlign;
};

export const TabsContext = createContext<TTabsContextValue>({
  color: 'primary',
  variant: 'line',
  anchor: 'bottom',
  size: 'md',
  textAlign: 'center',
});

export type TSTabsBaseProps = {
  color: TPaletteColor;
  variant: TTabsVariant;
  anchor: TTabsAnchor;
  justify: TTabsJustify;
};
