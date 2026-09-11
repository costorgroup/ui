import { HTMLAttributes, ReactNode } from 'react';
import type { TModalSize, TModalVariant } from './modal-base/types';

export type { TModalSize, TModalVariant };

export type TModalProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onClose' | 'title'
> & {
  children?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  headActions?: ReactNode;
  actions?: ReactNode;
  size?: TModalSize;
  variant?: TModalVariant;
  scrollable?: boolean;
  open?: boolean;
  onClose?: () => void;
};
