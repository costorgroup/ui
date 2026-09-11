import styled from '@emotion/styled';
import { colorMixBase } from '../../../surface';
import { TSMenuItemProps } from './types';

const customProps = new Set(['color', 'hasSubmenu']);

export const SMenuItem = styled('button', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSMenuItemProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0;
  border: none;
  background: transparent;
  font-family: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: 1.3;
  text-align: left;
  cursor: pointer;
  transition:
    background-color 0.12s ease,
    color 0.12s ease;

  ${({ theme, color }) => {
    const step = theme.sizes.sm;
    const palette = theme.palette[color];
    const hover = colorMixBase(palette.main, 12, theme.surfaces.background);

    return `
      gap: ${step.gap};
      padding: ${step.padY} ${step.padX};
      border-radius: ${theme.radius.sm};
      font-size: ${step.fontSize};
      color: ${palette.main};

      &:hover:not(:disabled),
      &:focus-visible {
        background-color: ${hover};
        color: ${palette.dark};
        outline: none;
      }
    `;
  }}

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  svg {
    flex-shrink: 0;
    width: ${({ theme }) => theme.sizes.sm.icon};
    height: ${({ theme }) => theme.sizes.sm.icon};
  }
`;

export const SMenuItemLabel = styled.span`
  flex: 1 1 auto;
  min-width: 0;
`;
