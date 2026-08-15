import { HTMLAttributes, ReactNode } from 'react';

export type TDraggablesOrientation = 'vertical' | 'horizontal';

export type TDraggablesBehaviour = 'move' | 'copy' | 'drop-zone' | 'contain';

export type TDraggablesLockAxis = 'x' | 'y';

export type TDropResult = {
  removedIndex: number | null;
  addedIndex: number | null;
  payload: unknown;
};

export type TDraggablesProps = Omit<HTMLAttributes<HTMLDivElement>, 'onDrop'> & {
  children?: ReactNode;
  orientation?: TDraggablesOrientation;
  behaviour?: TDraggablesBehaviour;
  groupName?: string;
  lockAxis?: TDraggablesLockAxis;
  dragHandleSelector?: string;
  nonDragAreaSelector?: string;
  animationDuration?: number;
  autoScroll?: boolean;
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
