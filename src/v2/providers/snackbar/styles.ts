import styled from '@emotion/styled';
import { TSSnackbarViewportProps } from './types';
import { snackbarInset, snackbarViewportWidthStyles } from './width-styles';

const customProps = new Set(['position', 'stretch']);

export const SSnackbarViewport = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSSnackbarViewportProps>`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.snackbar};
  display: flex;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  box-sizing: border-box;
  pointer-events: none;
  flex-direction: ${({ position }) =>
    position === 'bottom-left' || position === 'bottom-right' ? 'column-reverse' : 'column'};

  ${({ theme, position, stretch }) => {
    const inset = snackbarInset(theme);

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

    if (stretch) {
      return `
        align-items: stretch;
        ${snackbarViewportWidthStyles(theme, stretch)}
        ${positionStyles}
      `;
    }

    const alignItems =
      position === 'top-left' || position === 'bottom-left'
        ? 'flex-start'
        : 'flex-end';

    return `
      align-items: ${alignItems};
      ${positionStyles}
    `;
  }}
`;
