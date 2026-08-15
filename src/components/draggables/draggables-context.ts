import React, { createContext } from 'react';
import { TDraggablesContextValue } from './context';

export const DraggablesContext = createContext<TDraggablesContextValue | null>(
  null,
);
