import type { TTheme } from '../../../theme/types';
import type { TThemeColorScale } from '../../../theme/theming/color/types';
import { colorMix } from '../../surface';
import { V2_BUTTON_RADIUS } from '../button/variant-styles';
import type { TTreeViewSize, TTreeViewVariant } from './types';

const sizeTokens: Record<
  TTreeViewSize,
  {
    fontSize: string;
    indentSize: string;
    iconSize: string;
    paddingInline: string;
    paddingBlock: string;
    itemGap: string;
  }
> = {
  md: {
    fontSize: '14px',
    indentSize: '1rem',
    iconSize: '1rem',
    paddingInline: '0.75rem',
    paddingBlock: '0.375rem',
    itemGap: '0.5rem',
  },
  sm: {
    fontSize: '14px',
    indentSize: '1rem',
    iconSize: '0.75rem',
    paddingInline: '0.75rem',
    paddingBlock: '0.25rem',
    itemGap: '0.5rem',
  },
  xs: {
    fontSize: '12px',
    indentSize: '1rem',
    iconSize: '0.75rem',
    paddingInline: '0.5rem',
    paddingBlock: '0.25rem',
    itemGap: '0.5rem',
  },
};

export const treeSizeStyles = (size: TTreeViewSize) => {
  const tokens = sizeTokens[size];

  return `
    font-size: ${tokens.fontSize};
    --tree-item-gap: ${tokens.itemGap};
    --tree-indent-size: ${tokens.indentSize};
    --tree-icon-size: ${tokens.iconSize};
    --tree-padding-inline: ${tokens.paddingInline};
    --tree-padding-block: ${tokens.paddingBlock};
    --tree-indentation: calc(var(--tree-indent-size) + var(--tree-icon-size) * 0.5);
  `;
};

const selectedRowStyles = (
  variant: TTreeViewVariant,
  palette: TThemeColorScale,
) => {
  if (variant === 'solid') {
    return `
      background-color: ${palette.main};
      color: ${palette.contrastText};
    `;
  }

  return `
    background-color: ${palette.subtle};
    color: ${palette.fg};
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
  border-radius: ${V2_BUTTON_RADIUS};
  padding-inline: var(--tree-padding-inline);
  padding-block: var(--tree-padding-block);
  padding-inline-start: calc(
    var(--tree-padding-inline) + var(--tree-indentation) * (var(--depth, 1) - 1)
  );
  color: ${theme.colors.base.contrastText};
  font: inherit;
  text-align: left;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  transition: background-color 0.15s ease, color 0.15s ease;

  &:hover:not([data-disabled]),
  &:focus-visible:not([data-disabled]) {
    background-color: ${theme.colors.base.muted};
  }

  &[data-disabled] {
    color: ${theme.colors.common.grey[14]};
    cursor: default;
  }

  &[data-selected]:not([data-disabled]) {
    ${selectedRowStyles(variant, palette)}
  }

  &:focus-visible {
    outline: 2px solid ${colorMix(theme.colors.base.contrastText, 24)};
    outline-offset: -2px;
  }
`;
