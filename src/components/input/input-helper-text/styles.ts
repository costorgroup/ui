import styled from '@emotion/styled';
import { TInputHelperTextProps, TInputSize } from './types';

type TSInputHelperTextProps = Pick<TInputHelperTextProps, 'color' | 'size'>;

const customProps = new Set(['color', 'size']);

const sizeStyles: Record<TInputSize, string> = {
  xs: '0.6875rem',
  sm: '0.75rem',
  md: '0.8125rem',
  lg: '0.875rem',
  xl: '0.9375rem',
};

export const SInputHelperText = styled('p', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSInputHelperTextProps>`
  margin: 0;
  font-family: inherit;
  font-size: ${({ size = 'sm' }) => sizeStyles[size]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  color: ${({ theme, color = 'default' }) => theme.colors[color].main};
  user-select: none;
`;
