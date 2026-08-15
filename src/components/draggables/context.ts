import { TDraggablesBehaviour, TDraggablesOrientation } from './types';

export type TDraggablesContextValue = {
  containerId: string;
  orientation: TDraggablesOrientation;
  behaviour: TDraggablesBehaviour;
  dragHandleSelector?: string;
  nonDragAreaSelector?: string;
};

export const DRAGGABLE_ITEM_ATTR = 'data-cui-draggable';
export const DRAGGABLES_ATTR = 'data-cui-draggables';
