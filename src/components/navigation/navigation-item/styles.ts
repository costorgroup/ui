import styled from '@emotion/styled';
import {
  surfacePanelBackground,
  surfacePanelBorder,
  surfacePanelShadow,
} from '../../../helpers/variant-styles/surface';
import { TSNavigationItemPanelProps } from './types';

const customPanelProps = new Set(['open', 'top', 'left']);

export const SNavigationItemWrapper = styled.div`
  display: inline-flex;
`;

export const SNavigationItemChevron = styled.span<{ open: boolean }>`
  display: inline-flex;
  flex-shrink: 0;
  transition: transform 0.15s ease;
  transform: rotate(${({ open }) => (open ? 180 : 0)}deg);

  svg {
    display: block;
    width: 0.7em;
    height: 0.7em;
  }
`;

export const SNavigationItemPanel = styled('div', {
  shouldForwardProp: (prop) => !customPanelProps.has(prop),
})<TSNavigationItemPanelProps>`
  position: fixed;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
  z-index: ${({ theme }) => theme.zIndex.tooltip};
  box-sizing: border-box;
  min-width: 14rem;
  padding: ${({ theme }) => theme.spacing(theme.gap.sm)};
  border-radius: ${({ theme }) => theme.radius.medium};
  background-color: ${({ theme }) => surfacePanelBackground(theme)};
  border: ${({ theme }) => surfacePanelBorder(theme)};
  box-shadow: ${({ theme }) => surfacePanelShadow(theme)};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: ${({ theme }) => theme.surfaces.ink};
  opacity: ${({ open }) => (open ? 1 : 0)};
  transform: translateY(${({ open }) => (open ? '0' : '-4px')});
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
  transition: opacity 0.15s ease, transform 0.15s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
