import { createContext } from 'react';

export type TFlipbookContextValue = {
  page: number;
  pageCount: number;
  flipping: boolean;
  canPrev: boolean;
  canNext: boolean;
  next: () => void;
  prev: () => void;
  goTo: (page: number) => void;
  flippingTime: number;
  showControls: boolean;
};

export const FlipbookContext = createContext<TFlipbookContextValue | null>(
  null,
);
