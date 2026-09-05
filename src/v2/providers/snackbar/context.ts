import { createContext } from 'react';
import { TSnackbarContextValue } from './shared-types';

export const SnackbarContext = createContext<TSnackbarContextValue | null>(null);
