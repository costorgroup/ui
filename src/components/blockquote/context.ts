import { createContext, useContext } from 'react';
import { TPaletteColor } from '../../theme/types';
import type { TBlockquoteVariant } from './types';

export type TBlockquoteContextValue = {
  color: TPaletteColor;
  variant: TBlockquoteVariant;
};

export const BlockquoteContext = createContext<TBlockquoteContextValue | null>(
  null,
);

export const useBlockquoteContext = (): TBlockquoteContextValue => {
  const context = useContext(BlockquoteContext);

  if (context == null) {
    throw new Error('Blockquote parts must be used within BlockquoteBase.');
  }

  return context;
};
