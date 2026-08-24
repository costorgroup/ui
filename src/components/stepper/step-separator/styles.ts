import styled from '@emotion/styled';
import { TSStepSeparatorProps } from './types';

const customProps = new Set(['orientation', 'status']);

export const SStepSeparator = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSStepSeparatorProps>`
  flex: 1 1 auto;
  pointer-events: none;
  background-color: ${({ status }) =>
    status === 'complete'
      ? 'var(--stepper-main)'
      : 'var(--stepper-track)'};
  transition: background-color 0.15s ease;

  ${({ orientation }) =>
    orientation === 'horizontal'
      ? `
    height: 2px;
    min-width: 0.75rem;
    margin-inline: var(--stepper-gap);
    align-self: center;
  `
      : `
    width: 2px;
    min-height: 0.75rem;
    flex: 1 1 auto;
    margin-top: var(--stepper-gap);
  `}
`;
