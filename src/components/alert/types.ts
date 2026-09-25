import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../theme/types';
import type {
  TAlertRadius,
  TAlertSize,
  TAlertVariant,
} from './alert-base/types';
import type { TSlotProps } from '../../helpers/slot-props';
import type { TAlertIconProps } from './alert-icon/types';
import type { TAlertTitleProps } from './alert-title/types';
import type { TAlertContentProps } from './alert-content/types';
import type { TAlertActionsProps } from './alert-actions/types';
import type { TIconButtonProps } from '../icon-button/types';

export type { TAlertRadius, TAlertSize, TAlertVariant };

export type TAlertSlotProps = TSlotProps<{
  icon: TAlertIconProps;
  body: HTMLAttributes<HTMLDivElement>;
  title: TAlertTitleProps;
  content: TAlertContentProps;
  actions: TAlertActionsProps;
  closeButton: TIconButtonProps;
}>;

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
  slotProps?: TAlertSlotProps;
};
