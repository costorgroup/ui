import styled from '@emotion/styled';
import { TButtonOwnProps } from './types';
import { currentVariantStyles, variantStyles } from './variant-styles';

type TSButtonProps = Pick<
  TButtonOwnProps,
  'variant' | 'appearance' | 'size' | 'color' | 'radius'
>;

// 'as' must be excluded too: a custom shouldForwardProp otherwise makes
// emotion treat `as` as a regular DOM attribute instead of a tag override,
// which silently breaks polymorphic tag switching.
const customProps = new Set(['variant', 'appearance', 'size', 'color', 'radius', 'as']);

export const SButton = styled('button', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-height: 0;
  border: 1px solid;
  border-radius: ${({ theme, radius = 'sm' }) => theme.radius[radius]};
  font-family: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: 1;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition:
    background-color 0.12s ease,
    background-image 0.12s ease,
    border-color 0.12s ease,
    box-shadow 0.12s ease,
    color 0.12s ease,
    opacity 0.12s ease;

  ${({ theme, size = 'md' }) => {
    const step = theme.sizes[size];

    return `
      height: ${step.height};
      gap: ${step.gap};
      padding: 0 ${step.padX};
      font-size: ${step.fontSize};

      & svg {
        width: ${step.icon};
        height: ${step.icon};
      }
    `;
  }}

  ${({ theme, variant = 'solid', appearance = 'opaque', color = 'default' }) =>
    variantStyles(
      variant,
      theme.palette[color],
      theme,
      appearance,
      theme.surfaces.background,
    )}

  ${({ theme, variant = 'solid', appearance = 'opaque', color = 'default' }) =>
    currentVariantStyles(
      variant,
      theme.palette[color],
      theme,
      appearance,
      theme.surfaces.background,
    )}

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme, color = 'default' }) => theme.palette[color].main};
    outline-offset: 2px;
  }
`;
