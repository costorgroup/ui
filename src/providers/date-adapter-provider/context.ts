import { createContext } from 'react';
import type { TDateAdapter } from '../../helpers/date-adapter';

export const DateAdapterContext = createContext<TDateAdapter | null>(null);
