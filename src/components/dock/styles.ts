import styled from '@emotion/styled';
import {
  clampPaperElevation,
  colorMix,
  paperBackground,
  paperShadow,
} from '../../helpers/variant-styles/surface';
import { TSDockProps } from './types';

const customProps = new Set(['orientation', 'appearance', 'variant', 'size']);
const ELEVATION = 2;

export const SDock = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSDockProps>`
  display: inline-flex;
  box-sizing: border-box;
  flex-direction: ${({ orientation }) =>
    orientation === 'vertical' ? 'column' : 'row'};
  align-items: center;
  padding: ${({ theme, variant, size }) =>
    variant === 'plain' ? 0 : theme.sizes[size].padY};
  gap: ${({ theme, size }) => theme.sizes[size].gap};
  border-radius: ${({ theme, variant }) =>
    variant === 'plain' ? 0 : theme.radius.pill};
  color: ${({ theme }) => theme.surfaces.ink};

  ${({ theme, appearance, variant }) => {
    if (variant === 'plain') {
      return `
        background-color: transparent;
        border: 1px solid transparent;
        box-shadow: none;
      `;
    }

    const level = clampPaperElevation(ELEVATION);
    const fill = paperBackground(theme, level);
    const background =
      appearance === 'transparent' ? colorMix(fill, 80) : fill;
    const bordered = variant === 'surface';

    return `
      background-color: ${background};
      border: 1px solid ${bordered ? theme.surfaces.border : 'transparent'};
      box-shadow: ${paperShadow(theme, level)};
    `;
  }}
`;
