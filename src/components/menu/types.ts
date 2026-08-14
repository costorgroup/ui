import { HTMLAttributes, ReactNode } from 'react';
import { TMenuPlacement } from './context';

export type TMenuRootProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  children?: ReactNode;
  placement?: TMenuPlacement;
  offset?: number;
  anchorEl?: HTMLElement | null;
  open?: boolean;
  onClose?: () => void;
};
