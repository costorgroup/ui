import React, { useContext } from 'react';
import { AdapterDate } from '../../helpers/date-adapter';
import type { TDateAdapter } from '../../helpers/date-adapter';
import { DateAdapterContext } from './context';
import type { TDateAdapterProviderProps } from './types';

export const DateAdapterProvider = ({
  adapter = AdapterDate,
  children,
}: TDateAdapterProviderProps) => (
  <DateAdapterContext.Provider value={adapter}>
    {children}
  </DateAdapterContext.Provider>
);

export const useDateAdapter = (override?: TDateAdapter): TDateAdapter => {
  const context = useContext(DateAdapterContext);
  return override ?? context ?? AdapterDate;
};

export type { TDateAdapterProviderProps } from './types';
