import styled from '@emotion/styled';
import { TSBubbleActionProps } from '../types';

const customProps = new Set(['align']);

export const SBubbleAction = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSBubbleActionProps>`
  display: flex;
  align-items: center;
  justify-content: ${({ align }) => (align === 'end' ? 'flex-end' : 'flex-start')};
  flex-shrink: 0;
  box-sizing: border-box;
  width: 0;
  overflow: visible;
  z-index: 2;
  ${({ align }) =>
    align === 'end'
      ? '& > * { margin-right: 4px; }'
      : '& > * { margin-left: 4px; }'}
  opacity: 0;
  pointer-events: none;
  transform-origin: ${({ align }) =>
    align === 'end' ? 'right center' : 'left center'};
  transform: ${({ align }) =>
    align === 'end' ? 'translateX(10px) scale(0)' : 'translateX(-10px) scale(0)'};
  transition:
    opacity 0.2s ease,
    transform 0.22s cubic-bezier(0.32, 1.15, 0.32, 1);

  [data-bubble][data-actions-visible] &,
  &:has([aria-expanded='true']) {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(0) scale(1);
  }
`;
