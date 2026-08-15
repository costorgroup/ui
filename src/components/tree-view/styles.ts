import styled from '@emotion/styled';
import { TTreeViewSize } from './context';
import { TSTreeViewProps } from './types';

const customProps = new Set(['size']);

const fontSize: Record<TTreeViewSize, string> = {
  xs: '12px',
  sm: '13px',
  md: '14px',
  lg: '16px',
  xl: '18px',
};

export const STreeView = styled('ul', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSTreeViewProps>`
  --tree-view-pad: ${({ theme }) => theme.spacing(theme.gap.sm)};
  --tree-view-indent: ${({ theme }) => theme.spacing(theme.gap.lg)};
  --tree-view-icon: 1.15em;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: inherit;
  font-size: ${({ size }) => fontSize[size]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  color: ${({ theme }) => theme.colors.default.main};
  user-select: none;
  -webkit-user-select: none;
`;
