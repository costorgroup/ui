import { TTooltipPlacement } from './types';

type TRect = Pick<DOMRect, 'top' | 'left' | 'right' | 'bottom' | 'width' | 'height'>;

type TCoords = {
  top: number;
  left: number;
};

type TViewport = {
  width: number;
  height: number;
};

const clampToViewport = (
  value: number,
  size: number,
  viewportSize: number,
  padding: number,
) => {
  const min = padding;
  const max = viewportSize - size - padding;

  if (max < min) {
    return Math.max(0, (viewportSize - size) / 2);
  }

  return Math.min(Math.max(value, min), max);
};

export const getTooltipCoords = (
  trigger: TRect,
  tip: TRect,
  placement: TTooltipPlacement,
  offset: number,
  viewportPadding: number,
  viewport: TViewport,
): TCoords => {
  const [side, align = 'center'] = placement.includes('-')
    ? (placement.split('-') as [string, string])
    : [placement, 'center'];

  let top = 0;
  let left = 0;

  if (side === 'top' || side === 'bottom') {
    top = side === 'top' ? trigger.top - tip.height - offset : trigger.bottom + offset;

    if (align === 'start') {
      left = trigger.left;
    } else if (align === 'end') {
      left = trigger.right - tip.width;
    } else {
      left = trigger.left + trigger.width / 2 - tip.width / 2;
    }
  } else {
    left = side === 'left' ? trigger.left - tip.width - offset : trigger.right + offset;

    if (align === 'start') {
      top = trigger.top;
    } else if (align === 'end') {
      top = trigger.bottom - tip.height;
    } else {
      top = trigger.top + trigger.height / 2 - tip.height / 2;
    }
  }

  return {
    top: clampToViewport(top, tip.height, viewport.height, viewportPadding),
    left: clampToViewport(left, tip.width, viewport.width, viewportPadding),
  };
};
