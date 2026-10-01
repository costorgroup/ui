import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../theme/types';
import type {
  TAlertRadius,
  TAlertSize,
  TAlertVariant,
  TAlertAlign,
  TAlertActionsPlacement,
  TAlertBodyProps,
} from './alert-base/types';
import type { TSlotProps } from '../../helpers/slot-props';
import type { TAlertIconProps } from './alert-icon/types';
import type { TAlertTitleProps } from './alert-title/types';
import type { TAlertContentProps } from './alert-content/types';
import type { TAlertActionsProps } from './alert-actions/types';
import type { TAlertMessageProps } from './alert-message/types';
import type { TIconButtonProps } from '../icon-button/types';

export type {
  TAlertRadius,
  TAlertSize,
  TAlertVariant,
  TAlertAlign,
  TAlertActionsPlacement,
};

export type TAlertSlotProps = TSlotProps<{
  icon: TAlertIconProps;
  body: TAlertBodyProps;
  message: TAlertMessageProps;
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
  /** Icon's vertical alignment against the body. Default `start`. */
  iconAlign?: TAlertAlign;
  /** Actions under the message (`bottom`) or beside it (`end`). */
  actionsPlacement?: TAlertActionsPlacement;
  /** Cross-axis alignment of actions: horizontal when placed at the
   * `bottom` (default `end`), vertical when placed at the `end`
   * (default `center`). */
  actionsAlign?: TAlertAlign;
  color?: TPaletteColor;
  variant?: TAlertVariant;
  size?: TAlertSize;
  radius?: TAlertRadius;
  onClose?: () => void;
  slotProps?: TAlertSlotProps;
};
