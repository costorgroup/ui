import styled from '@emotion/styled';
import { stepIndicatorAppearance } from './variant-styles';
import { TSStepIndicatorProps } from './types';

const customProps = new Set(['status', 'variant', 'color', 'error']);

export const SStepIndicator = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSStepIndicatorProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-sizing: border-box;
  width: var(--stepper-indicator-size);
  height: var(--stepper-indicator-size);
  border-radius: 50%;
  border: 2px solid;
  font-family: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: calc(var(--stepper-indicator-size) * 0.4);
  line-height: 1;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease,
    box-shadow 0.15s ease;

  ${({ theme, status, variant, color, error }) => {
    const palette = theme.palette[color];
    const appearance = stepIndicatorAppearance(
      status,
      variant,
      palette,
      theme,
      error,
    );

    return `
      background-color: ${appearance.backgroundColor};
      border-color: ${appearance.borderColor};
      color: ${appearance.color};
      box-shadow: ${appearance.boxShadow ?? 'none'};
    `;
  }}
`;
