import styled from '@emotion/styled';
import {
  clampPaperElevation,
  paperBackground,
  paperShadow,
} from '../../helpers/variant-styles/surface';
import { TSPanelProps } from './types';

const customProps = new Set(['elevation', 'variant', 'radius']);

export const SPanel = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSPanelProps>`
  box-sizing: border-box;
  color: ${({ theme }) => theme.surfaces.ink};
  border-radius: ${({ theme, radius }) => theme.radius[radius]};

  ${({ theme, elevation, variant }) => {
    const level = clampPaperElevation(elevation);
    const filled = variant !== 'outline';
    const bordered = variant !== 'subtle';

    return `
      background-color: ${filled ? paperBackground(theme, level) : 'transparent'};
      border: 1px solid ${bordered ? theme.surfaces.border : 'transparent'};
      box-shadow: ${paperShadow(theme, level)};
    `;
  }}
`;
