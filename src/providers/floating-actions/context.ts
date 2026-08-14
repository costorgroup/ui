import { createContext } from 'react';
import { TSpeedDialItemsDirection } from '../../components/speed-dial/types';
import {
  TFloatingActionsItemsDirection,
  TFloatingActionsPosition,
} from './types';

export type TFloatingActionsContextValue = {
  slot: HTMLDivElement | null;
  position: TFloatingActionsPosition;
  itemsDirection: TFloatingActionsItemsDirection;
  naturalItemsDirection: TSpeedDialItemsDirection;
  changePosition: (position: TFloatingActionsPosition) => void;
  changeItemsDirection: (
    itemsDirection: TFloatingActionsItemsDirection,
  ) => void;
};

export const FloatingActionsContext =
  createContext<TFloatingActionsContextValue | null>(null);
