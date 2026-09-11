import styled from '@emotion/styled';
import { surfacePanelShadow } from '../../../surface';
import { TSnackbarPosition } from '../shared-types';
import { SNACKBAR_STACK_PEEK, SNACKBAR_STACK_SCALE_STEP } from '../stack';
import { isSnackbarBottom } from '../position';
import { TSSnackbarItemProps } from './types';
import { snackbarItemWidthStyles } from '../width-styles';

const customProps = new Set([
  'position',
  'open',
  'stretch',
  'stacked',
  'expanded',
  'stackIndex',
]);

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
  ${({ stretch, theme }) => snackbarItemWidthStyles(theme, stretch)}
  pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: transparent;
  box-shadow: ${({ theme }) => surfacePanelShadow(theme)};

  & > * {
    box-shadow: none;
  }

  ${({ stacked, expanded, stackIndex, position, open, stretch }) => {
    if (!stacked) {
      return `
        position: relative;
        opacity: ${open ? 1 : 0};
        transform: ${open ? 'translate3d(0, 0, 0)' : closedTransform(position)};
        transition:
          opacity ${SNACKBAR_ANIM_MS}ms ease,
          transform ${SNACKBAR_ANIM_MS}ms ease;
      `;
    }

    const originY = isSnackbarBottom(position) ? 'bottom' : 'top';
    const dir = isSnackbarBottom(position) ? -1 : 1;
    const scale = expanded ? 1 : 1 - stackIndex * SNACKBAR_STACK_SCALE_STEP;
    const y = expanded
      ? `calc(${dir * stackIndex} * (var(--snackbar-item-height) + var(--snackbar-stack-gap)))`
      : `${dir * stackIndex * SNACKBAR_STACK_PEEK}px`;
    const shownScale = open ? scale : scale * 0.98;

    return `
      grid-area: 1 / 1;
      width: ${stretch ? '100%' : 'auto'};
      z-index: ${32 - stackIndex};
      opacity: ${open ? 1 : 0};
      transform: translate3d(0, ${y}, 0) scale(${shownScale});
      transform-origin: ${originY} center;
      pointer-events: ${
        open && (expanded || stackIndex === 0) ? 'auto' : 'none'
      };
      transition:
        opacity ${SNACKBAR_ANIM_MS}ms ease,
        transform ${SNACKBAR_ANIM_MS}ms ease;
    `;
  }}
`;
