import { TSnackbarItem, TSnackbarPosition, TSnackbarRender } from '../shared-types';

export type TSnackbarItemProps = {
  item: TSnackbarItem;
  position: TSnackbarPosition;
  render: TSnackbarRender;
  stretch: boolean;
  stacked?: boolean;
  expanded?: boolean;
  stackIndex?: number;
  onClose: (id: string) => void;
  onExited: (id: string) => void;
};

export type TSSnackbarItemProps = {
  position: TSnackbarPosition;
  open: boolean;
  stretch: boolean;
  stacked: boolean;
  expanded: boolean;
  stackIndex: number;
};
