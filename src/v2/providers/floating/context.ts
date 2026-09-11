import { createContext } from 'react';
import {
  TFloatingItemsDirection,
  TFloatingNaturalDirection,
  TFloatingPosition,
} from './types';

export type TFloatingContextValue = {
  slot: HTMLDivElement | null;
  position: TFloatingPosition;
  itemsDirection: TFloatingItemsDirection;
  naturalItemsDirection: TFloatingNaturalDirection;
  changePosition: (position: TFloatingPosition) => void;
  changeItemsDirection: (itemsDirection: TFloatingItemsDirection) => void;
};

export const FloatingContext = createContext<TFloatingContextValue | null>(
  null,
);
