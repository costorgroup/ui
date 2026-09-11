import styled from '@emotion/styled';
import {
  idleVariantAppearance,
  PALETTE_TINT,
} from '../../../idle-variant-styles';
import { colorMixBase } from '../../../surface';
import { TSBlockquoteRailProps } from './types';

const customProps = new Set(['color', 'variant', 'thickness']);

export const SBlockquoteRail = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSBlockquoteRailProps>`
  box-sizing: border-box;
  flex-shrink: 0;
  align-self: stretch;
  min-height: 1em;
  border-style: solid;
  border-radius: ${({ theme }) => theme.radius.small};

  ${({ theme, color, variant, thickness }) => {
    const palette = theme.palette[color];
    const chrome =
      variant === 'outline'
        ? {
            backgroundColor: 'transparent',
            borderColor: palette.main,
          }
        : variant === 'plain'
          ? {
              backgroundColor: 'transparent',
              borderColor: 'transparent',
            }
          : idleVariantAppearance(variant, palette, theme);

    const backgroundColor =
      variant === 'subtle' || variant === 'surface'
        ? colorMixBase(
            palette.main,
            PALETTE_TINT,
            theme.surfaces.background,
          )
        : chrome.backgroundColor;

    return `
      width: ${thickness}px;
      background-color: ${backgroundColor};
      border-width: 1px;
      border-color: ${chrome.borderColor};
    `;
  }}
`;
