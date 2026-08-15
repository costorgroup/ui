import styled from '@emotion/styled';
import { TViewportProps } from './types';

type TSViewportProps = Pick<TViewportProps, 'radius' | 'color' | 'variant'>;

const customProps = new Set(['radius', 'color', 'variant']);

export const SViewport = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSViewportProps>`
  position: relative;
  display: block;
  box-sizing: border-box;
  min-width: 200px;
  min-height: 150px;
  overflow: hidden;
  transform: translateZ(0);
  border: 1px solid transparent;
  border-radius: ${({ theme, radius = 'medium' }) => theme.radius[radius]};

  ${({ theme, variant = 'surface', color = 'default' }) => {
    const palette = theme.colors[color];

    switch (variant) {
      case 'solid':
        return `
          background-color: ${palette.main};
          color: ${palette.contrastText};
          border-color: ${palette.main};
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${palette.main};
          border-color: ${palette.main};
        `;
      case 'ghost':
        return `
          background-color: transparent;
          color: ${palette.darker};
          border-color: transparent;
        `;
      case 'plain':
        return `
          background-color: transparent;
          color: ${palette.darker};
          border-color: transparent;
        `;
      case 'subtle':
        return `
          background-color: color-mix(in srgb, ${palette.main} 8%, transparent);
          color: ${palette.darker};
          border-color: transparent;
        `;
      case 'surface':
      default:
        return `
          background-color: color-mix(in srgb, ${palette.main} 8%, transparent);
          color: ${palette.darker};
          border-color: color-mix(in srgb, ${palette.main} 24%, transparent);
        `;
    }
  }}
`;
