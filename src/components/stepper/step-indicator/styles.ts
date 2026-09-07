import styled from '@emotion/styled';
import { TSStepIndicatorProps } from './types';

const customProps = new Set(['status', 'variant', 'error']);

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

  ${({ status, variant, error }) => {
    if (error) {
      return `
        background-color: var(--stepper-error);
        border-color: var(--stepper-error);
        color: #fff;
      `;
    }

    if (status === 'incomplete') {
      switch (variant) {
        case 'subtle':
          return `
            background-color: color-mix(in lab, var(--stepper-main) 8%, transparent);
            border-color: transparent;
            color: var(--stepper-darker);
          `;
        case 'surface':
          return `
            background-color: color-mix(in lab, var(--stepper-main) 8%, transparent);
            border-color: color-mix(in lab, var(--stepper-main) 24%, transparent);
            color: var(--stepper-darker);
          `;
        case 'outline':
          return `
            background-color: transparent;
            border-color: color-mix(in lab, var(--stepper-main) 36%, transparent);
            color: var(--stepper-darker);
          `;
        case 'plain':
          return `
            background-color: transparent;
            border-color: transparent;
            color: color-mix(in lab, var(--stepper-darker) 56%, transparent);
          `;
        default:
          return `
            background-color: transparent;
            border-color: var(--stepper-track);
            color: color-mix(in lab, var(--stepper-darker) 64%, transparent);
          `;
      }
    }

    if (status === 'active') {
      switch (variant) {
        case 'subtle':
          return `
            background-color: color-mix(in lab, var(--stepper-main) 16%, transparent);
            border-color: transparent;
            color: var(--stepper-darker);
            box-shadow: 0 0 0 3px color-mix(in lab, var(--stepper-main) 16%, transparent);
          `;
        case 'surface':
          return `
            background-color: color-mix(in lab, var(--stepper-main) 14%, transparent);
            border-color: var(--stepper-main);
            color: var(--stepper-darker);
          `;
        case 'outline':
          return `
            background-color: transparent;
            border-color: var(--stepper-main);
            color: var(--stepper-main);
            box-shadow: 0 0 0 3px color-mix(in lab, var(--stepper-main) 16%, transparent);
          `;
        case 'plain':
          return `
            background-color: transparent;
            border-color: transparent;
            color: var(--stepper-main);
          `;
        default:
          return `
            background-color: var(--stepper-main);
            border-color: var(--stepper-main);
            color: var(--stepper-contrast);
          `;
      }
    }

    // complete
    switch (variant) {
      case 'subtle':
        return `
          background-color: color-mix(in lab, var(--stepper-main) 16%, transparent);
          border-color: transparent;
          color: var(--stepper-darker);
        `;
      case 'surface':
        return `
          background-color: color-mix(in lab, var(--stepper-main) 14%, transparent);
          border-color: var(--stepper-main);
          color: var(--stepper-darker);
        `;
      case 'outline':
        return `
          background-color: transparent;
          border-color: var(--stepper-main);
          color: var(--stepper-main);
        `;
      case 'plain':
        return `
          background-color: transparent;
          border-color: transparent;
          color: var(--stepper-main);
        `;
      default:
        return `
          background-color: var(--stepper-main);
          border-color: var(--stepper-main);
          color: var(--stepper-contrast);
        `;
    }
  }}
`;
