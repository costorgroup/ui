import { createContext } from 'react';
import { TMediaViewerContextValue } from './types';

export const MediaViewerContext = createContext<TMediaViewerContextValue | null>(
  null,
);
