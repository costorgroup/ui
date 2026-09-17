import type { TTheme } from '../../theme/types';
import type { TThemeColorScale } from '../../theme/theming/color/types';
import { colorMix, colorMixBase } from '../../helpers/variant-styles/surface';
import { CHROME_FILL, CHROME_HOVER } from '../../helpers/variant-styles';
import type { TTreeViewSize, TTreeViewVariant } from './types';

export const treeSizeStyles = (size: TTreeViewSize, theme: TTheme) => {
  const step = theme.sizes[size];

  return `
    font-size: ${step.fontSize};
    --tree-item-gap: ${step.gap};
    --tree-indent-size: ${step.icon};
    --tree-icon-size: ${step.icon};
    --tree-padding-inline: ${step.padX};
    --tree-padding-block: ${step.padY};
    --tree-indentation: calc(var(--tree-indent-size) + var(--tree-icon-size) * 0.5);
  `;
};

const selectedRowStyles = (
  variant: TTreeViewVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => {
  if (variant === 'solid') {
    return `
      background-color: ${palette.main};
      color: ${palette.contrastText};
    `;
  }

  return `
    background-color: ${colorMixBase(
      theme.surfaces.mixer,
      CHROME_FILL,
      theme.surfaces.background,
    )};
    color: ${theme.surfaces.ink};
  `;
};

export const interactiveRowStyles = (
  variant: TTreeViewVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => `
  display: flex;
  align-items: center;
  gap: var(--tree-item-gap);
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  border: 0;
  border-radius: ${theme.radius.sm};
  padding-inline: var(--tree-padding-inline);
  padding-block: var(--tree-padding-block);
  padding-inline-start: calc(
    var(--tree-padding-inline) + var(--tree-indentation) * (var(--depth, 1) - 1)
  );
  color: ${theme.surfaces.ink};
  font: inherit;
  text-align: left;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  transition: background-color 0.15s ease, color 0.15s ease;

  &:hover:not([data-disabled]),
  &:focus-visible:not([data-disabled]) {
    background-color: ${colorMix(theme.surfaces.mixer, CHROME_HOVER)};
  }

  &[data-disabled] {
    color: ${theme.surfaces.muted};
    cursor: default;
  }

  &[data-selected]:not([data-disabled]) {
    ${selectedRowStyles(variant, palette, theme)}
  }

  &:focus-visible {
    outline: 2px solid ${colorMix(theme.surfaces.ink, 24)};
    outline-offset: -2px;
  }
`;
