import { HTMLAttributes, ReactNode } from 'react';
import type { TModalSize, TModalVariant } from './modal-base/types';
import type { TSlotProps } from '../../helpers/slot-props';
import type { TBackdropProps } from '../backdrop/types';
import type { TModalHeaderProps } from './modal-header/types';
import type { TModalDescriptionProps } from './modal-description/types';
import type { TModalHeaderActionsProps } from './modal-header-actions/types';
import type { TModalBodyProps } from './modal-body/types';
import type { TModalActionsProps } from './modal-actions/types';

export type { TModalSize, TModalVariant };

export type TModalSlotProps = TSlotProps<{
  backdrop: TBackdropProps;
  header: TModalHeaderProps;
  title: Omit<HTMLAttributes<HTMLHeadingElement>, 'color'>;
  description: TModalDescriptionProps;
  headerActions: TModalHeaderActionsProps;
  body: TModalBodyProps;
  actions: TModalActionsProps;
}>;

export type TModalProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onClose' | 'title'
> & {
  children?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  headerActions?: ReactNode;
  actions?: ReactNode;
  size?: TModalSize;
  variant?: TModalVariant;
  scrollable?: boolean;
  open?: boolean;
  onClose?: () => void;
  slotProps?: TModalSlotProps;
};
