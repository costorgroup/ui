import type {
  TDropdownAlign,
  TDropdownPlacement,
  TDropdownPosition,
  TGetDropdownPositionOptions,
} from './types';

export const getDropdownPosition = ({
  trigger,
  dropdownHeight,
  offset = 4,
  viewportPadding = 8,
  viewport = {
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  },
  preferred = 'bottom',
  align = 'start',
  width,
}: TGetDropdownPositionOptions): TDropdownPosition => {
  const height = Math.max(0, dropdownHeight);
  const dropdownWidth = width ?? trigger.width;
  const spaceBelow = viewport.height - trigger.bottom - offset - viewportPadding;
  const spaceAbove = trigger.top - offset - viewportPadding;

  let placement: TDropdownPlacement = preferred;

  if (preferred === 'bottom') {
    if (height > spaceBelow && spaceAbove > spaceBelow) {
      placement = 'top';
    }
  } else if (height > spaceAbove && spaceBelow > spaceAbove) {
    placement = 'bottom';
  }

  const top =
    placement === 'bottom'
      ? trigger.bottom + offset
      : trigger.top - height - offset;

  const triggerRight = trigger.right ?? trigger.left + trigger.width;
  const left =
    align === 'end' ? triggerRight - dropdownWidth : trigger.left;

  return {
    top,
    left,
    width: dropdownWidth,
    placement,
  };
};

export type {
  TDropdownAlign,
  TDropdownPlacement,
  TDropdownPosition,
  TDropdownRect,
  TGetDropdownPositionOptions,
} from './types';
