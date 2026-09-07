import styled from '@emotion/styled';
import { V2_BUTTON_RADIUS, variantStyles } from '../button/variant-styles';
import { TIconButtonProps, TIconButtonSize } from './types';

type TSIconButtonProps = Pick<
  TIconButtonProps,
  'variant' | 'appearance' | 'size' | 'color' | 'rounded'
>;

const customProps = new Set(['variant', 'appearance', 'size', 'color', 'rounded']);

const sizeStyles: Record<
  TIconButtonSize,
  { fontSize: string; pad: string; icon: string }
> = {
  xs: { fontSize: '11px', pad: '2px', icon: '1em' },
  sm: { fontSize: '12px', pad: '3px', icon: '1.1em' },
  md: { fontSize: '13px', pad: '4px', icon: '1.2em' },
  lg: { fontSize: '14px', pad: '5px', icon: '1.25em' },
  xl: { fontSize: '15px', pad: '6px', icon: '1.35em' },
};

export const SIconButton = styled('button', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSIconButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  min-height: 0;
  border: 1px solid;
  border-radius: ${({ rounded = false }) =>
    rounded ? '9999px' : V2_BUTTON_RADIUS};
  font-family: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: 1;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition:
    background-color 0.12s ease,
    border-color 0.12s ease,
    color 0.12s ease,
    opacity 0.12s ease;

  ${({ theme, variant = 'solid', appearance = 'opaque', color = 'default' }) => {
    const palette = theme.colors[color];
    return variantStyles(variant, palette, theme, appearance);
  }}

  ${({ size = 'md' }) => {
    const scale = sizeStyles[size];

    return `
      padding: ${scale.pad};
      font-size: ${scale.fontSize};

      & svg {
        width: ${scale.icon};
        height: ${scale.icon};
      }
    `;
  }}

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme, color = 'default' }) => theme.colors[color].main};
    outline-offset: 2px;
  }
`;
