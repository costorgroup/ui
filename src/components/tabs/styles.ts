import styled from '@emotion/styled';
import type { TTheme } from '../../theme/types';
import { CHROME_FILL } from '../../helpers/variant-styles';
import { colorMix, colorMixBase } from '../../helpers/variant-styles/surface';
import { STTabIndicatorProps, STTabsFadeProps, STTabsProps } from './types';

const trackFill = (
  theme: TTheme,
  appearance: STTabsProps['appearance'],
  variant: STTabsProps['variant'],
) => {
  if (variant === 'plain') {
    return 'transparent';
  }

  return appearance === 'transparent'
    ? colorMix(theme.surfaces.mixer, CHROME_FILL)
    : colorMixBase(theme.surfaces.mixer, CHROME_FILL, theme.surfaces.background);
};

const tabsCustomProps = new Set([
  'orientation',
  'appearance',
  'variant',
  'fullWidth',
  'dragging',
]);
const indicatorCustomProps = new Set([
  'appearance',
  'variant',
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
  display: flex;
  box-sizing: border-box;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
  padding: ${({ variant }) => (variant === 'plain' ? 0 : '3px')};
  border-radius: ${({ theme, variant }) =>
    variant === 'plain' ? 0 : theme.radius.md};
  border: 1px solid
    ${({ theme, variant }) =>
      variant === 'surface' ? theme.surfaces.border : 'transparent'};
  background-color: ${({ theme, appearance, variant }) =>
    trackFill(theme, appearance, variant)};
  flex-direction: ${({ orientation }) =>
    orientation === 'vertical' ? 'column' : 'row'};
  align-items: stretch;
  user-select: ${({ dragging }) => (dragging ? 'none' : 'auto')};
  touch-action: ${({ dragging }) => (dragging ? 'none' : 'auto')};
`;

export const STabsList = styled('div', {
  shouldForwardProp: (prop) => prop !== 'orientation' && prop !== 'panning',
})<{ orientation: STTabsProps['orientation']; panning: boolean }>`
  position: relative;
  display: flex;
  flex: 1 1 auto;
  flex-direction: ${({ orientation }) =>
    orientation === 'vertical' ? 'column' : 'row'};
  align-items: stretch;
  min-width: 0;
  min-height: 0;
  width: 100%;
  overflow-x: ${({ orientation }) =>
    orientation === 'horizontal' ? 'auto' : 'hidden'};
  overflow-y: ${({ orientation }) =>
    orientation === 'vertical' ? 'auto' : 'hidden'};
  cursor: ${({ panning }) => (panning ? 'grabbing' : 'inherit')};
  touch-action: ${({ orientation }) =>
    orientation === 'horizontal' ? 'pan-y' : 'pan-x'};
  user-select: ${({ panning }) => (panning ? 'none' : 'auto')};
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const STabIndicator = styled('span', {
  shouldForwardProp: (prop) => !indicatorCustomProps.has(prop),
})<STTabIndicatorProps>`
  pointer-events: none;
  position: absolute;
  top: ${({ y, height }) => `${y + height / 2}px`};
  left: ${({ x, width }) => `${x + width / 2}px`};
  z-index: 0;
  display: block;
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  border-radius: ${({ theme }) => theme.radius.sm};
  background-color: ${({ theme, appearance, color }) => {
    if (color != null) {
      return theme.palette[color].main;
    }

    return appearance === 'transparent'
      ? colorMix(theme.surfaces.ink, 80)
      : theme.surfaces.ink;
  }};
  box-shadow: ${({ theme, appearance, color }) => {
    if (color != null) {
      return `0 0 0 0.5px ${colorMix(theme.palette[color].main, 24)},
         0 1px 3px ${colorMix(theme.palette.common.black, 14)}`;
    }

    return appearance === 'transparent'
      ? `0 0 0 0.5px ${colorMix(theme.surfaces.ink, 24)},
         0 1px 3px ${colorMix(theme.palette.common.black, 14)}`
      : `0 0 0 0.5px ${colorMix(theme.palette.common.black, 8)},
         0 0.5px 1px ${colorMix(theme.palette.common.black, 6)},
         0 1px 3px ${colorMix(theme.palette.common.black, 10)},
         0 2px 6px ${colorMix(theme.palette.common.black, 6)}`;
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

const fadeCustomProps = new Set([
  'side',
  'orientation',
  'appearance',
  'variant',
  'visible',
]);

export const STabFade = styled('span', {
  shouldForwardProp: (prop) => !fadeCustomProps.has(prop),
})<STTabsFadeProps>`
  pointer-events: none;
  position: absolute;
  z-index: 2;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.2s ease;
  ${({ orientation, side }) =>
    orientation === 'vertical'
      ? `
        left: 0;
        right: 0;
        height: 28px;
        ${side === 'start' ? 'top: 0;' : 'bottom: 0;'}
      `
      : `
        top: 0;
        bottom: 0;
        width: 28px;
        ${side === 'start' ? 'left: 0;' : 'right: 0;'}
      `}
  background: linear-gradient(
    ${({ orientation, side }) =>
      orientation === 'vertical'
        ? side === 'start'
          ? 'to bottom'
          : 'to top'
        : side === 'start'
          ? 'to right'
          : 'to left'},
    ${({ appearance, theme, variant }) =>
        trackFill(theme, appearance, variant)} 0%,
    ${({ appearance, theme, variant }) =>
        trackFill(theme, appearance, variant)} 18%,
    transparent 100%
  );
`;
