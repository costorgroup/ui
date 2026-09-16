import styled from '@emotion/styled';
import { variantStyles } from '../../button/variant-styles';
import { TSBubbleContentProps } from '../types';

const customProps = new Set(['color', 'variant']);

export const SBubbleContent = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSBubbleContentProps>`
  box-sizing: border-box;
  width: fit-content;
  max-width: ${({ variant }) => (variant === 'ghost' ? '100%' : '80%')};
  min-width: 0;
  padding: ${({ theme }) => theme.spacing(theme.gap.md)};
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radius.lg};
  font-family: inherit;
  font-size: ${({ theme }) => theme.sizes.md.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  word-break: break-word;
  transition:
    background-color 0.12s ease,
    border-color 0.12s ease,
    color 0.12s ease;

  ${({ theme, color, variant }) => {
    const palette = theme.palette[color];
    const chrome = variantStyles(
      variant,
      palette,
      theme,
      'opaque',
      theme.surfaces.background,
    );

    if (variant === 'ghost') {
      return `
        width: 100%;
        ${chrome}
      `;
    }

    return chrome;
  }}

  button&,
  a& {
    cursor: pointer;
    appearance: none;
    font: inherit;
    text-align: inherit;
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme, color }) => theme.palette[color].main};
    outline-offset: 2px;
  }
`;
