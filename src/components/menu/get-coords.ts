import { TMenuPlacement } from './context';

type TRect = Pick<DOMRect, 'top' | 'left' | 'right' | 'bottom' | 'width' | 'height'>;

type TViewport = {
  width: number;
  height: number;
};

type TCoords = {
  top: number;
  left: number;
};

export type TMenuPosition = TCoords & {
  placement: TMenuPlacement;
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

const computeCoords = (
  trigger: TRect,
  tip: TRect,
  placement: TMenuPlacement,
  offset: number,
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

  return { top, left };
};

const flipSide = (placement: TMenuPlacement): TMenuPlacement => {
  const [side, align] = placement.includes('-')
    ? placement.split('-')
    : [placement, undefined];

  const opposite: Record<string, string> = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
  };

  const next = opposite[side] ?? side;

  return (align ? `${next}-${align}` : next) as TMenuPlacement;
};

const overflowScore = (
  coords: TCoords,
  tip: TRect,
  viewport: TViewport,
  padding: number,
) => {
  const leftOverflow = Math.max(0, padding - coords.left);
  const topOverflow = Math.max(0, padding - coords.top);
  const rightOverflow = Math.max(0, coords.left + tip.width - (viewport.width - padding));
  const bottomOverflow = Math.max(0, coords.top + tip.height - (viewport.height - padding));

  return leftOverflow + topOverflow + rightOverflow + bottomOverflow;
};

export const getMenuPosition = (
  trigger: TRect,
  tip: TRect,
  preferred: TMenuPlacement,
  offset: number,
  viewportPadding: number,
  viewport: TViewport,
): TMenuPosition => {
  const preferredCoords = computeCoords(trigger, tip, preferred, offset);
  const preferredScore = overflowScore(preferredCoords, tip, viewport, viewportPadding);

  let placement = preferred;
  let coords = preferredCoords;

  if (preferredScore > 0) {
    const flipped = flipSide(preferred);
    const flippedCoords = computeCoords(trigger, tip, flipped, offset);
    const flippedScore = overflowScore(flippedCoords, tip, viewport, viewportPadding);

    if (flippedScore < preferredScore) {
      placement = flipped;
      coords = flippedCoords;
    }
  }

  return {
    placement,
    top: clampToViewport(coords.top, tip.height, viewport.height, viewportPadding),
    left: clampToViewport(coords.left, tip.width, viewport.width, viewportPadding),
  };
};
