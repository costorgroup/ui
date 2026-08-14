export type TDropdownPlacement = 'top' | 'bottom';

export type TDropdownAlign = 'start' | 'end';

export type TDropdownRect = {
  top: number;
  left: number;
  right?: number;
  bottom: number;
  width: number;
  height?: number;
};

export type TGetDropdownPositionOptions = {
  trigger: TDropdownRect;
  dropdownHeight: number;
  offset?: number;
  viewportPadding?: number;
  viewport?: {
    width: number;
    height: number;
  };
  preferred?: TDropdownPlacement;
  align?: TDropdownAlign;
  width?: number;
};

export type TDropdownPosition = {
  top: number;
  left: number;
  width: number;
  placement: TDropdownPlacement;
};
