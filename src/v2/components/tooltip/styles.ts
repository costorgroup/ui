import styled from '@emotion/styled';
import { staticChromeVariantStyles } from '../../idle-variant-styles';
import {
  TSTooltipContentProps,
  TSTooltipPanelProps,
  TTooltipPlacement,
} from './types';

const customContentProps = new Set(['top', 'left', 'placement', 'visible']);
const customPanelProps = new Set(['variant', 'color']);

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

export const STooltipPanel = styled('span', {
  shouldForwardProp: (prop) => !customPanelProps.has(prop),
})<TSTooltipPanelProps>`
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radius.medium};
  font-family: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: 12px;
  line-height: 1.2;
  padding: ${({ theme }) => theme.spacing(theme.gap.xs)};
  white-space: normal;

  ${({ theme, variant = 'surface', color = 'default' }) =>
    staticChromeVariantStyles(variant, theme.colors[color], theme)}
`;
