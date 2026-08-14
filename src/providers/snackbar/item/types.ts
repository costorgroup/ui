import { TSnackbarItem, TSnackbarPosition, TSnackbarRender } from '../shared-types';

export type TSnackbarItemProps = {
  item: TSnackbarItem;
  position: TSnackbarPosition;
  render: TSnackbarRender;
  onClose: (id: string) => void;
  onExited: (id: string) => void;
};

export type TSSnackbarItemProps = {
  position: TSnackbarPosition;
  open: boolean;
};
