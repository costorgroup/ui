import styled from '@emotion/styled';
import { PALETTE_TINT } from '../../helpers/variant-styles';
import { colorMixBase } from '../../helpers/variant-styles/surface';
import { THighlightOwnProps } from './types';

type TSHighlightProps = Pick<THighlightOwnProps, 'color' | 'variant'>;

const customProps = new Set(['color', 'variant', 'as']);

export const SHighlight = styled('span', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSHighlightProps>`
  font: inherit;
  font-size: inherit;
  font-weight: inherit;
  font-family: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  box-sizing: border-box;
  padding: 0.05em 0.2em;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.small};

  ${({ theme, color = 'default', variant = 'subtle' }) => {
    const palette = theme.palette[color];

    if (variant === 'solid') {
      return `
        background-color: ${palette.main};
        color: ${palette.contrastText};
        border-color: ${palette.main};
      `;
    }

    const fill = colorMixBase(
      palette.main,
      PALETTE_TINT,
      theme.surfaces.background,
    );

    return `
      background-color: ${fill};
      color: ${palette.main};
      border-color: ${variant === 'surface' ? palette.main : 'transparent'};
    `;
  }}
`;
