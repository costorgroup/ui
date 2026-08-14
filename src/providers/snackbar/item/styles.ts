import styled from '@emotion/styled';
import { TSnackbarPosition } from '../shared-types';
import { TSSnackbarItemProps } from './types';

const customProps = new Set(['position', 'open']);

export const SNACKBAR_ANIM_MS = 280;

const closedTransform = (position: TSnackbarPosition) => {
  if (position === 'top-left' || position === 'bottom-left') {
    return 'translate3d(calc(-100% - 1.5rem), 0, 0)';
  }

  return 'translate3d(calc(100% + 1.5rem), 0, 0)';
};

export const SSnackbarItem = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSSnackbarItemProps>`
  position: relative;
  width: 100%;
  pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
  border-radius: ${({ theme }) => theme.radius.medium};
  background-color: transparent;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: ${({ theme }) => {
    const black = theme.colors.common.black;

    return `
      0 4px 10px ${black}0a,
      0 1px 4px ${black}08,
      0 1px 2px ${black}05
    `;
  }};
  opacity: ${({ open }) => (open ? 1 : 0)};
  transform: ${({ open, position }) => (open ? 'translate3d(0, 0, 0)' : closedTransform(position))};
  transition:
    opacity ${SNACKBAR_ANIM_MS}ms ease,
    transform ${SNACKBAR_ANIM_MS}ms ease;

  & > * {
    box-shadow: none;
  }
`;
