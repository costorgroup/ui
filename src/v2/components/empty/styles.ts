import styled from '@emotion/styled';
import { CUI_CANVAS_VAR } from '../../../helpers/color/create-color-scale';
import { TSEmptyProps } from './types';

const customProps = new Set(['radius', 'appearance', 'variant']);

export const SEmpty = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSEmptyProps>`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  gap: ${({ theme }) => theme.spacing(theme.gap.lg)};
  padding: ${({ theme }) => theme.spacing(theme.gap.xl)};
  border-radius: ${({ theme, radius }) => theme.radius[radius]};
  text-align: center;
  color: ${({ theme }) => theme.surfaces.ink};

  ${({ theme, appearance, variant }) => {
    const canvas = theme.surfaces.background;
    const fill =
      appearance === 'opaque'
        ? `
            ${CUI_CANVAS_VAR}: ${canvas};
            background-color: ${canvas};
          `
        : `
            ${CUI_CANVAS_VAR}: transparent;
            background-color: transparent;
          `;

    const border =
      variant === 'surface'
        ? `border: 1px dashed ${theme.surfaces.border};`
        : 'border: 1px solid transparent;';

    return `${fill}${border}`;
  }}
`;
