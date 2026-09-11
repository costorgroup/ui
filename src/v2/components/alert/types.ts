import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../theme/types';
import type {
  TAlertRadius,
  TAlertSize,
  TAlertVariant,
} from './alert-base/types';

export type { TAlertRadius, TAlertSize, TAlertVariant };

export type TAlertProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'title'
> & {
  children?: ReactNode;
  title?: ReactNode;
  actions?: ReactNode;
  icon?: ReactNode;
  color?: TPaletteColor;
  variant?: TAlertVariant;
  size?: TAlertSize;
  radius?: TAlertRadius;
  onClose?: () => void;
};
