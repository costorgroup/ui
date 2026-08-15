import styled from '@emotion/styled';
import { draggableClasses } from './classes';

export const SDraggable = styled.div`
  box-sizing: border-box;
  cursor: grab;
  touch-action: none;

  &.${draggableClasses.dragging} {
    cursor: grabbing;
  }
`;
