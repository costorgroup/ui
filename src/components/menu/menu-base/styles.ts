import styled from '@emotion/styled';
import { TSMenuBaseProps } from './types';

const customProps = new Set(['top', 'left', 'visible']);

export const SMenuBase = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSMenuBaseProps>`
  position: fixed;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
  z-index: ${({ theme }) => theme.zIndex.tooltip};
  box-sizing: border-box;
  min-width: 10rem;
  padding: ${({ theme }) => theme.spacing(theme.gap.xs)};
  border-radius: ${({ theme }) => theme.radius.medium};
  background-color: ${({ theme }) => theme.colors.common.white};
  box-shadow: ${({ theme }) => {
    const black = theme.colors.common.black;

    return `
      0 4px 10px ${black}0a,
      0 1px 4px ${black}08,
      0 1px 2px ${black}05
    `;
  }};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) => (visible ? 'scale(1)' : 'scale(0.96)')};
  transform-origin: top left;
  pointer-events: auto;
  transition:
    opacity 0.12s ease,
    transform 0.12s ease;
`;
