import { createContext, MouseEvent, useContext } from 'react';
import { TPaletteColor } from '../../theme/types';
import { TBubbleAlign, TBubbleVariant } from './types';

export type TBubbleContextValue = {
  color: TPaletteColor;
  variant: TBubbleVariant;
  align: TBubbleAlign;
  onReactionsClick?: (event: MouseEvent<HTMLDivElement>) => void;
};

export const BubbleContext = createContext<TBubbleContextValue | null>(null);

export const useBubbleContext = () => {
  const context = useContext(BubbleContext);

  if (context == null) {
    throw new Error('Bubble parts must be used within Bubble.');
  }

  return context;
};
