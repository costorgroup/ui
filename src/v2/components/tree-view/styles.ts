import styled from '@emotion/styled';
import type { TTheme, TPaletteColor } from '../../../theme/types';
import { chromeTransparentFill } from '../../surface';
import { interactiveRowStyles, treeSizeStyles } from './slot-styles';
import type { TTreeViewSize, TTreeViewVariant } from './types';

type TStyledRowProps = {
  variant: TTreeViewVariant;
  color: TPaletteColor;
};

const appearanceProps = new Set(['variant', 'color', 'size']);

const paletteAt = (theme: TTheme, color: TPaletteColor) => theme.colors[color];

export const STreeViewRoot = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  width: 100%;
  color: ${({ theme }) => theme.colors.default.main};
  font-family: inherit;
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
`;

export const STreeViewTree = styled('div', {
  shouldForwardProp: (prop) => !appearanceProps.has(prop),
})<{ size: TTreeViewSize }>`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  ${({ size }) => treeSizeStyles(size)}

  svg {
    width: var(--tree-icon-size);
    height: var(--tree-icon-size);
  }
`;

export const STreeViewLabel = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: inherit;
`;

export const STreeViewBranch = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
`;

export const STreeViewBranchContent = styled.div`
  position: relative;

  &[hidden] {
    display: none;
  }
`;

export const STreeViewBranchIndentGuide = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: ${({ theme }) => chromeTransparentFill(theme, 16)};
  pointer-events: none;
  inset-inline-start: calc(
    var(--tree-padding-inline) + var(--tree-indentation) * (var(--depth, 1) - 1) +
      var(--tree-icon-size) * 0.5
  );
  z-index: 1;
`;

export const STreeViewBranchControl = styled('div', {
  shouldForwardProp: (prop) => !appearanceProps.has(prop),
})<TStyledRowProps>`
  ${({ theme, variant, color }) =>
    interactiveRowStyles(variant, paletteAt(theme, color), theme)}
`;

export const STreeViewItem = styled('div', {
  shouldForwardProp: (prop) => !appearanceProps.has(prop),
})<TStyledRowProps>`
  ${({ theme, variant, color }) =>
    interactiveRowStyles(variant, paletteAt(theme, color), theme)}
`;

export const STreeViewBranchText = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const STreeViewItemText = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const STreeViewBranchIndicator = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: inherit;
  transform-origin: center;
  transition: transform 0.2s ease;

  &[data-state='open'] {
    transform: rotate(90deg);
  }
`;

export const STreeViewBranchTrigger = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
`;

export const STreeViewItemIndicator = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: inherit;
`;

export const STreeViewNodeCheckbox = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const STreeViewNodeRenameInput = styled.input`
  flex: 1;
  min-width: 0;
  font: inherit;
  color: inherit;
  background: transparent;
  border: 0;
  outline: none;
`;
