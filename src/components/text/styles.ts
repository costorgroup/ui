import styled from '@emotion/styled';
import { TTextOwnProps, TTextSize } from './types';

type TSTextProps = Pick<TTextOwnProps, 'color' | 'size'>;

const customProps = new Set(['color', 'size']);

const typographySizeMap: Record<TTextSize, 'small' | 'medium' | 'large'> = {
  xs: 'small',
  sm: 'small',
  md: 'medium',
  lg: 'large',
  xl: 'large',
};

export const SText = styled('p', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSTextProps>`
  margin: 0;
  font-family: inherit;
  font-size: ${({ theme, size = 'md' }) =>
    theme.typography.text[typographySizeMap[size]]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  color: ${({ theme, color = 'default' }) => theme.colors[color].main};
`;
