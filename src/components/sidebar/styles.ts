import styled from '@emotion/styled';
import { TGap, TTheme } from '../../theme/types';
import { TSidebarSpacing, TSSidebarProps } from './types';

const customProps = new Set(['as', 'size', 'gap', 'padding', 'collapsed']);

export const resolveSidebarSpacing = (
  theme: TTheme,
  value: TSidebarSpacing | undefined,
) => {
  if (value === undefined) {
    return '0';
  }

  if (typeof value === 'number') {
    return theme.spacing(value);
  }

  if (value in theme.gap) {
    return theme.spacing(theme.gap[value as TGap]);
  }

  return value;
};

export const SSidebar = styled('nav', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSSidebarProps>`
  display: flex;
  flex-direction: column;
  /* Collapsed: don't stretch wrappers (e.g. a Badge around an item), so they
     hug the square cell and anchor to its corner. */
  align-items: ${({ collapsed }) => (collapsed ? 'flex-start' : 'stretch')};
  box-sizing: border-box;
  min-width: 0;
  margin: 0;
  gap: ${({ theme, gap }) => resolveSidebarSpacing(theme, gap)};
  padding: ${({ theme, padding }) => resolveSidebarSpacing(theme, padding)};
`;
