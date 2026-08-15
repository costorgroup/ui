import { HTMLAttributes, ReactNode } from 'react';
import { TMenuPlacement } from './context';

export type TMenuAnchorPosition = {
  top: number;
  left: number;
};

export type TMenuRootProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  children?: ReactNode;
  placement?: TMenuPlacement;
  offset?: number;
  anchorEl?: HTMLElement | null;
  anchorPosition?: TMenuAnchorPosition | null;
  open?: boolean;
  onClose?: () => void;
};
