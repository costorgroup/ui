import { ReactNode } from 'react';
import { TSnackbarPosition, TSnackbarRender } from './shared-types';

export type TSnackbarProviderProps = {
  children?: ReactNode;
  position?: TSnackbarPosition;
  duration?: number;
  render?: TSnackbarRender;
};

export type TSSnackbarViewportProps = {
  position: TSnackbarPosition;
};
