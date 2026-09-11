import type { MouseEvent } from 'react';
import type { TMenuPlacement } from '../../components/menu/context';
import type { TMenuAnchorPosition } from '../../components/menu/types';

export type TMenuTrigger = 'click' | 'hover' | 'context';

export type TUseMenuOptions = {
  trigger?: TMenuTrigger;
  delay?: number;
  placement?: TMenuPlacement;
  offset?: number;
};

export type TUseMenuTriggerProps = {
  'aria-haspopup': 'menu';
  'aria-expanded': boolean;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLElement>) => void;
  onContextMenu?: (event: MouseEvent<HTMLElement>) => void;
};

export type TUseMenuMenuProps = {
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  anchorPosition: TMenuAnchorPosition | null;
  offset: number;
  placement?: TMenuPlacement;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export type TUseMenuReturn = {
  open: boolean;
  close: () => void;
  triggerProps: TUseMenuTriggerProps;
  menuProps: TUseMenuMenuProps;
};
