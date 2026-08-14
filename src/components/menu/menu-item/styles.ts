import styled from '@emotion/styled';
import { TSMenuItemProps } from './types';

const customProps = new Set(['color', 'hasSubmenu']);

export const SMenuItem = styled('button', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSMenuItemProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  width: 100%;
  margin: 0;
  padding: ${({ theme }) =>
    `${theme.spacing(theme.gap.sm)} ${theme.spacing(theme.gap.md)}`};
  border: none;
  border-radius: ${({ theme }) => theme.radius.medium};
  background: transparent;
  color: ${({ theme, color }) => theme.colors[color].main};
  font: inherit;
  font-size: 14px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  text-align: left;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;

  &:hover:not(:disabled),
  &:focus-visible {
    background-color: ${({ theme, color }) =>
      `color-mix(in srgb, ${theme.colors[color].main} 10%, transparent)`};
    color: ${({ theme, color }) => theme.colors[color].dark};
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    flex-shrink: 0;
    width: 1em;
    height: 1em;
  }
`;

export const SMenuItemLabel = styled.span`
  flex: 1 1 auto;
  min-width: 0;
`;
