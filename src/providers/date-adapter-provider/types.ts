import { ReactNode } from 'react';
import type { TDateAdapter } from '../../helpers/date-adapter';

export type TDateAdapterProviderProps = {
  adapter?: TDateAdapter;
  children: ReactNode;
};
