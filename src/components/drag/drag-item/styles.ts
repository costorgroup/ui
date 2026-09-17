import styled from '@emotion/styled';
import { dragItemClasses } from './classes';

export const SDragItem = styled.div`
  box-sizing: border-box;
  cursor: grab;
  touch-action: none;

  &.${dragItemClasses.dragging} {
    cursor: grabbing;
  }
`;
