import { HTMLAttributes, ReactNode } from 'react';
import type {
  TDrawerAnchor,
  TDrawerSize,
  TDrawerVariant,
} from './drawer-base/types';
import type { TSlotProps } from '../../helpers/slot-props';
import type { TBackdropProps } from '../backdrop/types';
import type { TDrawerHeaderProps } from './drawer-header/types';
import type { TDrawerDescriptionProps } from './drawer-description/types';
import type { TDrawerHeaderActionsProps } from './drawer-header-actions/types';
import type { TDrawerBodyProps } from './drawer-body/types';
import type { TDrawerActionsProps } from './drawer-actions/types';

export type { TDrawerAnchor, TDrawerSize, TDrawerVariant };

export type TDrawerSlotProps = TSlotProps<{
  backdrop: TBackdropProps;
  header: TDrawerHeaderProps;
  title: Omit<HTMLAttributes<HTMLHeadingElement>, 'color'>;
  description: TDrawerDescriptionProps;
  headerActions: TDrawerHeaderActionsProps;
  body: TDrawerBodyProps;
  actions: TDrawerActionsProps;
}>;

export type TDrawerProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onClose' | 'title'
> & {
  children?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  headerActions?: ReactNode;
  actions?: ReactNode;
  size?: TDrawerSize;
  anchor?: TDrawerAnchor;
  variant?: TDrawerVariant;
  scrollable?: boolean;
  open?: boolean;
  onClose?: () => void;
  slotProps?: TDrawerSlotProps;
};
