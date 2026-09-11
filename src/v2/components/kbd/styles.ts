import styled from '@emotion/styled';
import { PALETTE_TINT, SURFACE_BORDER_IDLE } from '../../idle-variant-styles';
import { colorMixBase } from '../../surface';
import { typographyChromeStyles } from '../../typography-chrome';
import { TKbdOwnProps } from './types';

type TSKbdProps = Pick<TKbdOwnProps, 'variant' | 'size' | 'color'>;

const customProps = new Set(['variant', 'size', 'color']);

export const SKbd = styled('kbd', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSKbdProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radius.small};
  padding: 0.1em 0.35em;
  min-width: 1.6em;
  font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas,
    'Liberation Mono', monospace;
  font-size: ${({ theme, size = 'md' }) => theme.sizes[size].fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1.2;
  white-space: nowrap;
  vertical-align: middle;

  ${({ theme, variant = 'raised', color = 'default' }) => {
    const palette = theme.palette[color];

    if (variant === 'raised') {
      const fill = colorMixBase(
        palette.main,
        PALETTE_TINT,
        theme.surfaces.background,
      );
      const edge = colorMixBase(
        palette.main,
        SURFACE_BORDER_IDLE,
        theme.surfaces.background,
      );

      return `
        background-color: ${fill};
        color: ${palette.main};
        border-color: ${edge};
        box-shadow: inset 0 -2px 0 0 ${edge};
      `;
    }

    return `
      ${typographyChromeStyles(variant, palette, theme)}
      box-shadow: none;
    `;
  }}
`;
