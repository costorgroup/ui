import styled from '@emotion/styled';
import { SNACKBAR_STACK_PEEK } from './stack';
import { isSnackbarBottom, isSnackbarLeft } from './position';
import { TSSnackbarViewportProps } from './types';
import { snackbarInset, snackbarViewportWidthStyles } from './width-styles';

const customProps = new Set([
  'position',
  'stretch',
  'stacked',
  'expanded',
  'stackCount',
  'itemHeight',
  'itemWidth',
]);

export const SSnackbarViewport = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSSnackbarViewportProps>`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.snackbar};
  box-sizing: border-box;
  pointer-events: ${({ stacked, stackCount }) =>
    stacked && stackCount > 0 ? 'auto' : 'none'};

  ${({ theme, position, stretch, stacked, expanded, stackCount, itemHeight }) => {
    const inset = snackbarInset(theme);
    const gap = theme.spacing(theme.gap.sm);
    const fromBottom = isSnackbarBottom(position);
    const fromLeft = isSnackbarLeft(position);

    const positionStyles = (() => {
      switch (position) {
        case 'top-left':
          return `
            top: ${inset};
            left: ${inset};
          `;
        case 'top-right':
          return `
            top: ${inset};
            right: ${inset};
          `;
        case 'bottom-left':
          return `
            bottom: ${inset};
            left: ${inset};
          `;
        case 'bottom-right':
        default:
          return `
            bottom: ${inset};
            right: ${inset};
          `;
      }
    })();

    const alignItems = fromLeft ? 'flex-start' : 'flex-end';
    const widthStyles = stretch
      ? snackbarViewportWidthStyles(theme, stretch)
      : '';

    if (!stacked) {
      return `
        display: flex;
        gap: ${gap};
        flex-direction: ${fromBottom ? 'column-reverse' : 'column'};
        align-items: ${stretch ? 'stretch' : alignItems};
        ${positionStyles}
        ${widthStyles}
      `;
    }

    const count = Math.max(stackCount, 1);
    const extra = expanded
      ? itemHeight > 0
        ? `calc((${count} - 1) * (var(--snackbar-item-height) + var(--snackbar-stack-gap)))`
        : '0px'
      : `${(count - 1) * SNACKBAR_STACK_PEEK}px`;

    return `
      display: grid;
      --snackbar-item-height: ${itemHeight}px;
      --snackbar-stack-gap: ${gap};
      justify-items: center;
      align-items: ${fromBottom ? 'end' : 'start'};
      ${fromBottom ? `padding-top: ${extra};` : `padding-bottom: ${extra};`}
      transition: padding 200ms ease;
      ${positionStyles}
      ${widthStyles}
    `;
  }}
`;
