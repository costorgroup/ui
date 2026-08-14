import styled from '@emotion/styled';
import { TSSliderSlidesProps } from './types';

const customProps = new Set([
  'translateX',
  'transitionMs',
  'disableTransition',
  'isDraggable',
  'dragging',
]);

export const SSliderSlides = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSSliderSlidesProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: max-content;
  transform: translate3d(${({ translateX }) => translateX}px, 0, 0);
  transition: ${({ disableTransition, transitionMs }) =>
    disableTransition ? 'none' : `transform ${transitionMs}ms ease`};
  will-change: transform;
  touch-action: ${({ isDraggable }) => (isDraggable ? 'pan-y' : 'auto')};
  cursor: ${({ isDraggable, dragging }) =>
    isDraggable ? (dragging ? 'grabbing' : 'grab') : 'auto'};
  user-select: ${({ dragging }) => (dragging ? 'none' : 'auto')};
`;
