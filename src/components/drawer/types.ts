import { HTMLAttributes, ReactNode } from 'react';
import type { TDrawerAnchor, TDrawerSize } from './drawer-base/types';

export type { TDrawerAnchor, TDrawerSize };

export type TDrawerProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onClose' | 'title'
> & {
  children?: ReactNode;
  title?: ReactNode;
  actions?: ReactNode;
  size?: TDrawerSize;
  anchor?: TDrawerAnchor;
  scrollable?: boolean;
  onClose?: () => void;
};
