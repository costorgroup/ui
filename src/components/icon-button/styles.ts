import styled from '@emotion/styled';
import { variantStyles } from '../button/variant-styles';
import { TIconButtonProps } from './types';

type TSIconButtonProps = Pick<
  TIconButtonProps,
  'variant' | 'appearance' | 'size' | 'color' | 'radius'
>;

const customProps = new Set(['variant', 'appearance', 'size', 'color', 'radius']);

export const SIconButton = styled('button', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSIconButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-sizing: border-box;
  aspect-ratio: 1 / 1;
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
      min-width: ${step.height};
      min-height: ${step.height};
      padding: 0;
      font-size: ${step.fontSize};

      & svg {
        width: ${step.icon};
        height: ${step.icon};
        flex-shrink: 0;
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
