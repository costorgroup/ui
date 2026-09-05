import styled from '@emotion/styled';
import { CHROME_IDLE, SURFACE_BORDER_IDLE } from '../../idle-variant-styles';
import {
  chromeOpaqueFill,
  chromeTransparentFill,
  surfaceBorder,
} from '../../surface';
import { STTabIndicatorProps, STTabsProps } from './types';

const tabsCustomProps = new Set([
  'orientation',
  'appearance',
  'fullWidth',
  'dragging',
  'color',
]);
const indicatorCustomProps = new Set([
  'appearance',
  'color',
  'width',
  'height',
  'x',
  'y',
  'ready',
  'dragging',
]);

export const STabs = styled('div', {
  shouldForwardProp: (prop) => !tabsCustomProps.has(prop),
})<STTabsProps>`
  position: relative;
  display: inline-flex;
  box-sizing: border-box;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  max-width: 100%;
  padding: 3px;
  border-radius: ${({ theme }) => theme.radius.medium};
  border: ${({ theme }) => surfaceBorder(theme, SURFACE_BORDER_IDLE)};
  background-color: ${({ theme, appearance }) =>
    appearance === 'transparent'
      ? chromeTransparentFill(theme, CHROME_IDLE)
      : chromeOpaqueFill(theme, CHROME_IDLE)};
  flex-direction: ${({ orientation }) =>
    orientation === 'vertical' ? 'column' : 'row'};
  align-items: stretch;
  user-select: ${({ dragging }) => (dragging ? 'none' : 'auto')};
  touch-action: ${({ dragging }) => (dragging ? 'none' : 'auto')};
`;

export const STabIndicator = styled('span', {
  shouldForwardProp: (prop) => !indicatorCustomProps.has(prop),
})<STTabIndicatorProps>`
  pointer-events: none;
  position: absolute;
  top: ${({ y, height }) => `${y + height / 2}px`};
  left: ${({ x, width }) => `${x + width / 2}px`};
  z-index: 0;
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  border-radius: ${({ theme }) => theme.radius.small};
  background-color: ${({ theme, appearance, color }) => {
    if (color != null) {
      return theme.colors[color].main;
    }

    return appearance === 'transparent'
      ? `color-mix(in srgb, ${theme.colors.base.contrastText} 80%, transparent)`
      : theme.colors.base.contrastText;
  }};
  box-shadow: ${({ theme, appearance, color }) => {
    if (color != null) {
      return `0 0 0 0.5px color-mix(in srgb, ${theme.colors[color].main} 24%, transparent),
         0 1px 3px color-mix(in srgb, ${theme.colors.common.black} 14%, transparent)`;
    }

    return appearance === 'transparent'
      ? `0 0 0 0.5px color-mix(in srgb, ${theme.colors.base.contrastText} 24%, transparent),
         0 1px 3px color-mix(in srgb, ${theme.colors.common.black} 14%, transparent)`
      : `0 0 0 0.5px color-mix(in srgb, ${theme.colors.common.black} 8%, transparent),
         0 0.5px 1px color-mix(in srgb, ${theme.colors.common.black} 6%, transparent),
         0 1px 3px color-mix(in srgb, ${theme.colors.common.black} 10%, transparent),
         0 2px 6px color-mix(in srgb, ${theme.colors.common.black} 6%, transparent)`;
  }};
  transform: translate(-50%, -50%);
  transition: ${({ ready, dragging }) =>
    ready && !dragging
      ? `top 0.28s cubic-bezier(0.4, 0, 0.2, 1),
         left 0.28s cubic-bezier(0.4, 0, 0.2, 1),
         width 0.28s cubic-bezier(0.4, 0, 0.2, 1),
         height 0.28s cubic-bezier(0.4, 0, 0.2, 1)`
      : 'none'};
  will-change: ${({ dragging }) => (dragging ? 'top, left, width, height' : 'auto')};
`;
