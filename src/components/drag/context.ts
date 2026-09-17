import { createContext } from 'react';
import { TDragBehaviour, TDragOrientation } from './types';

export type TDragGroupContextValue = {
  containerId: string;
  orientation: TDragOrientation;
  behaviour: TDragBehaviour;
  dragHandleSelector?: string;
  nonDragAreaSelector?: string;
};

export const DRAG_ITEM_ATTR = 'data-cui-drag-item';
export const DRAG_GROUP_ATTR = 'data-cui-drag-group';

export const DragGroupContext = createContext<TDragGroupContextValue | null>(
  null,
);
