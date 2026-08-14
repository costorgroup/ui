import styled from '@emotion/styled';
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
  padding: ${({ theme, padding }) => (padding ? theme.spacing(10) : 0)};
  overflow: ${({ scrollable }) => (scrollable ? 'hidden' : 'auto')};
  background-color: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.common.black} 48%,
    transparent
  );
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`;
