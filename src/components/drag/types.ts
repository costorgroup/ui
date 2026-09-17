import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../theme/types';

export type TDragOrientation = 'vertical' | 'horizontal';

export type TDragBehaviour = 'move' | 'copy' | 'drop-zone' | 'contain';

export type TDragLockAxis = 'x' | 'y';

export type TDropResult = {
  removedIndex: number | null;
  addedIndex: number | null;
  payload: unknown;
};

export type TDragGroupProps = Omit<HTMLAttributes<HTMLDivElement>, 'onDrop' | 'color'> & {
  children?: ReactNode;
  orientation?: TDragOrientation;
  behaviour?: TDragBehaviour;
  groupName?: string;
  lockAxis?: TDragLockAxis;
  dragHandleSelector?: string;
  nonDragAreaSelector?: string;
  animationDuration?: number;
  autoScroll?: boolean;
  /** Accent used for the drop placeholder. */
  color?: TPaletteColor;
  getChildPayload?: (index: number) => unknown;
  shouldAcceptDrop?: (
    source: { groupName?: string; payload: unknown },
    payload: unknown,
  ) => boolean;
  onDragStart?: (payload: unknown) => void;
  onDragEnd?: (payload: unknown) => void;
  onDragEnter?: () => void;
  onDragLeave?: () => void;
  onDrop?: (result: TDropResult) => void;
};

export type TSDragGroupProps = {
  orientation: TDragOrientation;
  color: TPaletteColor;
};
