import styled from '@emotion/styled';
import { overlayFade, overlayZoom } from '../../../motion';
import { Panel } from '../../panel';
import { TSMenuBaseProps } from './types';

const customProps = new Set(['top', 'left']);

export const SMenuBase = styled(Panel, {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSMenuBaseProps>`
  position: fixed;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
  z-index: ${({ theme }) => theme.zIndex.tooltip};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-width: 10rem;
  padding: ${({ theme }) => theme.spacing(theme.gap.xs)};
  transform-origin: top left;
  pointer-events: none;
  ${overlayFade}
  ${overlayZoom}

  &[data-open='true'] {
    pointer-events: auto;
  }
`;
