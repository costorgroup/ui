import styled from '@emotion/styled';
import { listShellVariantStyles } from './variant-styles';
import { TSListProps } from './types';

const customProps = new Set(['color', 'variant', 'radius']);

export const SList = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSListProps>`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  border-radius: ${({ theme, radius }) => theme.radius[radius]};
  ${({ theme, color, variant }) => {
    const palette = theme.palette[color];
    return listShellVariantStyles(variant, palette, theme);
  }}
`;
