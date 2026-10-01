import styled from '@emotion/styled';
import { TSSidebarSeparatorProps } from './types';

const customProps = new Set(['size', 'collapsed']);

// Spaces itself like the item slots do, so it works with Sidebar's default
// zero gap. Collapsed: as wide as the square icon cells.
export const SSidebarSeparator = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSSidebarSeparatorProps>`
  box-sizing: border-box;
  flex-shrink: 0;
  width: ${({ theme, size, collapsed }) =>
    collapsed ? theme.sizes[size].height : '100%'};
  padding: ${({ theme, size }) => theme.sizes[size].padY} 0;
`;
