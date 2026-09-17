import { TSnackbarPosition } from './shared-types';

export const SNACKBAR_POSITIONS: TSnackbarPosition[] = [
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
];

export const isSnackbarBottom = (position: TSnackbarPosition) =>
  position === 'bottom-left' || position === 'bottom-right';

export const isSnackbarLeft = (position: TSnackbarPosition) =>
  position === 'top-left' || position === 'bottom-left';
