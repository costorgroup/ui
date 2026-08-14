import styled from '@emotion/styled';
import { TTooltipPlacement, TSTooltipContentProps } from './types';

const customContentProps = new Set(['top', 'left', 'placement', 'visible']);

const hiddenTransform = (placement: TTooltipPlacement) => {
  if (placement.startsWith('top')) {
    return 'translate3d(0, 6px, 0)';
  }

  if (placement.startsWith('bottom')) {
    return 'translate3d(0, -6px, 0)';
  }

  if (placement.startsWith('left')) {
    return 'translate3d(6px, 0, 0)';
  }

  return 'translate3d(-6px, 0, 0)';
};

export const STooltipTrigger = styled.span`
  display: inline-flex;
  max-width: 100%;
  vertical-align: middle;
`;

export const STooltipContent = styled('div', {
  shouldForwardProp: (prop) => !customContentProps.has(prop),
})<TSTooltipContentProps>`
  position: fixed;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
  z-index: ${({ theme }) => theme.zIndex.tooltip};
  box-sizing: border-box;
  max-width: min(20rem, calc(100vw - ${({ theme }) => theme.spacing(theme.gap.lg)}));
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible, placement }) =>
    visible ? 'translate3d(0, 0, 0)' : hiddenTransform(placement)};
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
`;
