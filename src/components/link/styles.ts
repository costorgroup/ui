import styled from '@emotion/styled';
import { TLinkOwnProps } from './types';

type TSLinkProps = Pick<TLinkOwnProps, 'color' | 'variant' | 'size'>;

const customProps = new Set(['color', 'variant', 'size']);

export const SLink = styled('a', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSLinkProps>`
  display: inline;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  font-family: inherit;
  font-size: ${({ theme, size = 'md' }) => theme.typography.text[size]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  color: ${({ theme, color = 'primary' }) => theme.palette[color].main};
  text-decoration: ${({ variant = 'hover' }) =>
    variant === 'underline' ? 'underline' : 'none'};
  text-underline-offset: 0.2em;

  &:hover {
    color: ${({ theme, color = 'primary' }) => theme.palette[color].dark};
    text-decoration: ${({ variant = 'hover' }) =>
      variant === 'plain' ? 'none' : 'underline'};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme, color = 'primary' }) => theme.palette[color].main};
    outline-offset: 2px;
    border-radius: ${({ theme }) => theme.radius.small};
  }
`;
