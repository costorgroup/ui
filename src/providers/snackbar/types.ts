import { ReactNode } from 'react';
import { TAlertSize } from '../../components/alert/types';
import { TSnackbarPosition, TSnackbarRender } from './shared-types';

export type TSnackbarProviderProps = {
  children?: ReactNode;
  position?: TSnackbarPosition;
  duration?: number;
  render?: TSnackbarRender;
  stretch?: boolean;
  stacked?: boolean;
  maxVisible?: number;
  /** Required when `stacked` is true so every snackbar shares the same size. */
  size?: TAlertSize;
};

export type TSSnackbarViewportProps = {
  position: TSnackbarPosition;
  stretch: boolean;
  stacked: boolean;
  expanded: boolean;
  stackCount: number;
  itemHeight: number;
  itemWidth: number;
};
