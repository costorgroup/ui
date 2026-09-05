import { createContext } from 'react';
import {
  TFloatingActionsItemsDirection,
  TFloatingActionsNaturalDirection,
  TFloatingActionsPosition,
} from './types';

export type TFloatingActionsContextValue = {
  slot: HTMLDivElement | null;
  position: TFloatingActionsPosition;
  itemsDirection: TFloatingActionsItemsDirection;
  naturalItemsDirection: TFloatingActionsNaturalDirection;
  changePosition: (position: TFloatingActionsPosition) => void;
  changeItemsDirection: (
    itemsDirection: TFloatingActionsItemsDirection,
  ) => void;
};

export const FloatingActionsContext =
  createContext<TFloatingActionsContextValue | null>(null);
