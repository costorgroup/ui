import { HTMLAttributes, ReactNode } from 'react';
import type {
  TDrawerAnchor,
  TDrawerSize,
  TDrawerVariant,
} from './drawer-base/types';

export type { TDrawerAnchor, TDrawerSize, TDrawerVariant };

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
};
