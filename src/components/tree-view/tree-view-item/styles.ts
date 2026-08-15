import styled from '@emotion/styled';
import { TSTreeViewItemContentProps } from './types';

const customContentProps = new Set(['level', 'selected', 'disabled', 'color']);

export const STreeViewItem = styled.li`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const STreeViewItemContent = styled('div', {
  shouldForwardProp: (prop) => !customContentProps.has(prop),
})<TSTreeViewItemContentProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(theme.gap.xs)};
  min-width: 0;
  width: 100%;
  margin: 0;
  padding-top: ${({ theme }) => theme.spacing(theme.gap.xs)};
  padding-right: ${({ theme }) => theme.spacing(theme.gap.sm)};
  padding-bottom: ${({ theme }) => theme.spacing(theme.gap.xs)};
  padding-left: ${({ theme, level }) =>
    `calc(var(--tree-view-pad, ${theme.spacing(theme.gap.sm)}) + ${level} * var(--tree-view-indent, ${theme.spacing(theme.gap.lg)}))`};
  border: 0;
  border-radius: ${({ theme }) => theme.radius.medium};
  background-color: ${({ theme, selected, color, disabled }) => {
    if (disabled) {
      return 'transparent';
    }

    if (selected) {
      return `color-mix(in srgb, ${theme.colors[color].main} 12%, transparent)`;
    }

    return 'transparent';
  }};
  color: ${({ theme, selected, color, disabled }) => {
    if (disabled) {
      return theme.colors.common.grey[14];
    }

    if (selected) {
      return theme.colors[color].darker;
    }

    return 'inherit';
  }};
  font: inherit;
  text-align: left;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  user-select: none;
  -webkit-user-select: none;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${({ theme, selected, color, disabled }) => {
      if (disabled) {
        return 'transparent';
      }

      if (selected) {
        return `color-mix(in srgb, ${theme.colors[color].main} 16%, transparent)`;
      }

      return `color-mix(in srgb, ${theme.colors.common.black} 6%, transparent)`;
    }};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme, color }) => theme.colors[color].main};
    outline-offset: -2px;
  }
`;
