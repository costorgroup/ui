import { HTMLAttributes, ReactNode } from 'react';
import type { TModalSize } from './modal-base/types';

export type { TModalSize };

export type TModalProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onClose' | 'title'
> & {
  children?: ReactNode;
  title?: ReactNode;
  actions?: ReactNode;
  size?: TModalSize;
  scrollable?: boolean;
  onClose?: () => void;
};
