import styled from '@emotion/styled';
import { CUI_CANVAS_VAR } from '../../../../helpers/color/create-color-scale';
import { idleVariantAppearance } from '../../../idle-variant-styles';
import { surfacePanelShadow } from '../../../surface';
import { TSAlertBaseProps } from './types';

const customProps = new Set(['color', 'variant', 'size', 'radius', 'closable']);

export const SAlertBase = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSAlertBaseProps>`
  position: relative;
  display: flex;
  align-items: flex-start;
  box-sizing: border-box;
  width: 100%;
  border: 1px solid transparent;
  border-radius: ${({ theme, radius }) => theme.radius[radius]};
  box-shadow: ${({ theme }) => surfacePanelShadow(theme)};
  font-family: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};

  ${({ theme, size, closable }) => {
    const step = theme.sizes[size];
    return `
      gap: ${step.gap};
      padding: ${step.padX};
      ${closable ? `padding-right: calc(${step.padX} + ${step.icon});` : ''}
      font-size: ${step.fontSize};
      --alert-gap: ${step.gap};
      --alert-icon-size: ${step.icon};
    `;
  }}

  ${({ theme, variant, color }) => {
    const palette = theme.palette[color];
    const idle = idleVariantAppearance(variant, palette, theme);

    return `
      ${CUI_CANVAS_VAR}: ${idle.backgroundColor};
      background-color: ${idle.backgroundColor};
      color: ${idle.color};
      border-color: ${idle.borderColor};
    `;
  }}
`;

export const SAlertBody = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(theme.gap.xs)};
  min-width: 0;
`;
