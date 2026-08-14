import styled from '@emotion/styled';
import { TSSnackbarViewportProps } from './types';

const customProps = new Set(['position']);

export const SSnackbarViewport = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSSnackbarViewportProps>`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.snackbar};
  display: flex;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  box-sizing: border-box;
  width: min(100%, 24rem);
  max-width: calc(100vw - ${({ theme }) => theme.spacing(theme.gap.lg)});
  pointer-events: none;
  flex-direction: ${({ position }) =>
    position === 'bottom-left' || position === 'bottom-right' ? 'column-reverse' : 'column'};

  ${({ theme, position }) => {
    const inset = theme.spacing(theme.gap.md);

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
  }}
`;
