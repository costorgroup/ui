import styled from '@emotion/styled';
import { variantStyles } from '../button/variant-styles';
import { IconButton } from '../icon-button';
import { TChipProps } from './types';

type TSChipProps = Pick<
  TChipProps,
  'variant' | 'appearance' | 'size' | 'color' | 'radius'
> & {
  clickable: boolean;
};

const customProps = new Set([
  'variant',
  'appearance',
  'size',
  'color',
  'radius',
  'clickable',
]);

export const SChip = styled('span', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSChipProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-height: 0;
  vertical-align: middle;
  border: 1px solid;
  border-radius: ${({ theme, radius = 'sm' }) => theme.radius[radius]};
  font-family: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: 1.2;
  letter-spacing: -0.01em;
  white-space: nowrap;
  user-select: ${({ clickable }) => (clickable ? 'none' : 'auto')};
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  transition:
    background-color 0.12s ease,
    background-image 0.12s ease,
    border-color 0.12s ease,
    box-shadow 0.12s ease,
    color 0.12s ease,
    opacity 0.12s ease;

  gap: 0.35em;
  padding: 0.1em 0.35em;
  font-size: ${({ theme, size = 'md' }) => theme.sizes[size].fontSize};

  ${({
    theme,
    variant = 'solid',
    appearance = 'opaque',
    color = 'default',
    clickable,
  }) =>
    variantStyles(
      variant,
      theme.palette[color],
      theme,
      appearance,
      theme.surfaces.background,
      clickable,
    )}

  &[aria-disabled='true'] {
    opacity: 0.45;
    cursor: not-allowed;
    pointer-events: none;
  }

  ${({ theme, color = 'default', clickable }) =>
    clickable
      ? `
        &:focus-visible {
          outline: 2px solid ${theme.palette[color].main};
          outline-offset: 2px;
        }
      `
      : ''}
`;

export const SChipDelete = styled(IconButton)`
  && {
    color: inherit;
    border-color: transparent;
    background-color: transparent;
  }

  &:hover:not(:disabled),
  &:active:not(:disabled) {
    && {
      color: inherit;
      border-color: transparent;
      background-color: color-mix(in oklab, currentColor 12%, transparent);
    }
  }
`;
