import { ReactNode } from 'react';
import { TAlertSize, TAlertVariant } from '../../components/alert/types';
import { TPaletteColor } from '../../theme/types';

export type TSnackbarPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export type TSnackbarRenderProps = {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  color?: TPaletteColor;
  variant?: TAlertVariant;
  size?: TAlertSize;
  icon?: ReactNode;
  onClose: () => void;
};

export type TSnackbarRender = (props: TSnackbarRenderProps) => ReactNode;

export type TSnackbarEnqueueOptions = {
  title?: ReactNode;
  description?: ReactNode;
  color?: TPaletteColor;
  variant?: TAlertVariant;
  size?: TAlertSize;
  icon?: ReactNode;
  duration?: number;
  position?: TSnackbarPosition;
  render?: TSnackbarRender;
};

export type TSnackbarItem = TSnackbarEnqueueOptions & {
  id: string;
  exiting: boolean;
};

export type TSnackbarContextValue = {
  enqueue: (options?: TSnackbarEnqueueOptions) => string;
  close: (id: string) => void;
  closeAll: () => void;
};
