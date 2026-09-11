import styled from '@emotion/styled';
import { overlayFade } from '../../motion';
import { TSBackdropProps } from './types';

const customProps = new Set([
  'scrollable',
  'align',
  'justify',
  'padding',
  'layer',
]);

const alignMap = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  stretch: 'stretch',
} as const;

const justifyMap = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  stretch: 'stretch',
} as const;

export const SBackdrop = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSBackdropProps>`
  position: fixed;
  inset: 0;
  z-index: ${({ theme, layer }) => theme.zIndex[layer]};
  display: flex;
  align-items: ${({ align }) => alignMap[align]};
  justify-content: ${({ justify }) => justifyMap[justify]};
  padding: ${({ theme, padding }) =>
    padding ? theme.spacing(theme.gap.xl) : 0};
  overflow: ${({ scrollable }) => (scrollable ? 'hidden' : 'auto')};
  background-color: ${({ theme }) => theme.surfaces.backdrop};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  ${overlayFade}

  &[hidden] {
    display: none;
  }
`;
