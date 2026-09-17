import styled from '@emotion/styled';
import { TPaletteColor, TTheme } from '../../../theme/types';
import { colorMix } from '../../../helpers/variant-styles/surface';
import { TSTableProps } from './types';

const customProps = new Set(['size', 'color']);

const resolveTableTint = (theme: TTheme, color: TPaletteColor) => {
  const isDefault = color === 'default';
  const headPigment = isDefault ? theme.surfaces.mixer : theme.palette[color].main;

  return {
    // Divider and row hover always follow the current light/dark surface —
    // only the head background reflects the selected accent color.
    divider: theme.surfaces.divider,
    headBg: colorMix(headPigment, isDefault ? 6 : 10),
    rowHover: colorMix(theme.surfaces.mixer, 6),
  };
};

export const STable = styled('table', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSTableProps>`
  box-sizing: border-box;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  font-family: inherit;
  font-size: ${({ theme, size }) => theme.sizes[size].fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  color: ${({ theme }) => theme.surfaces.ink};
  text-align: left;

  ${({ theme, size, color }) => {
    const { divider, headBg, rowHover } = resolveTableTint(theme, color);

    return `
      --table-pad-y: ${theme.sizes[size].padY};
      --table-pad-x: ${theme.sizes[size].padX};
      --table-border: ${divider};
      --table-head-bg: ${headBg};
      --table-row-hover: ${rowHover};
    `;
  }}
`;
