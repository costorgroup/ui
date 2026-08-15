import { createContext, RefObject } from 'react';

export type TMenuPlacement =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'left-start'
  | 'left'
  | 'left-end'
  | 'right-start'
  | 'right'
  | 'right-end';

export type TMenuAnchor = {
  getBoundingClientRect: () => DOMRect;
  contains?: (node: Node | null) => boolean;
};

export type TMenuContextValue = {
  menuId: string;
  open: boolean;
  placement: TMenuPlacement;
  offset: number;
  getAnchor: () => TMenuAnchor | null;
  close: () => void;
};

export const MenuContext = createContext<TMenuContextValue | null>(null);

export type TMenuContentContextValue = {
  isSubmenu: boolean;
  submenuPlacement: TMenuPlacement;
};

export const MenuContentContext = createContext<TMenuContentContextValue | null>(null);

export type TMenuItemContextValue = {
  itemRef: RefObject<HTMLElement | null>;
  submenuOpen: boolean;
  setSubmenuOpen: (open: boolean) => void;
  openSubmenu: () => void;
  scheduleCloseSubmenu: () => void;
  cancelCloseSubmenu: () => void;
};

export const MenuItemContext = createContext<TMenuItemContextValue | null>(null);
