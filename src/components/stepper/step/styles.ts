import styled from '@emotion/styled';
import { stepContentClasses } from '../step-content/classes';
import { stepSeparatorClasses } from '../step-separator/classes';
import { TSStepProps } from './types';

const customProps = new Set([
  'orientation',
  'alternativeLabel',
  'status',
  'error',
  'disabled',
]);

export const SStep = styled('li', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSStepProps>`
  position: relative;
  display: flex;
  box-sizing: border-box;
  flex: ${({ orientation }) =>
    orientation === 'horizontal' ? '1 1 0' : '0 0 auto'};
  min-width: 0;
  opacity: ${({ disabled }) => (disabled ? 0.48 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

  ${({ orientation, alternativeLabel }) =>
    orientation === 'horizontal'
      ? alternativeLabel
        ? `
    flex-direction: column;
    align-items: center;
    text-align: center;
  `
        : `
    flex-direction: row;
    align-items: center;
  `
      : `
    flex-direction: row;
    align-items: stretch;
    gap: var(--stepper-gap);
  `}

  ${({ orientation }) =>
    orientation === 'vertical'
      ? `
    &:last-child .${stepSeparatorClasses.root} {
      display: none;
    }

    &:last-child .${stepContentClasses.root} {
      padding-bottom: 0;
    }
  `
      : `
    &:last-child {
      flex: 0 1 auto;
    }

    &:last-child .${stepSeparatorClasses.root} {
      display: none;
    }
  `}
`;

export const SStepMain = styled('div', {
  shouldForwardProp: (prop) => prop !== 'alternativeLabel',
})<{ alternativeLabel?: boolean }>`
  display: flex;
  align-items: center;
  gap: var(--stepper-gap);
  min-width: 0;
  position: relative;
  z-index: 1;

  ${({ alternativeLabel }) =>
    alternativeLabel
      ? `
    flex-direction: column;
    align-items: center;
    text-align: center;
  `
      : ''}
`;

export const SStepLabels = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0.5)};
  min-width: 0;
`;

export const SStepRail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: var(--stepper-indicator-size);
`;

export const SStepBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(theme.gap.xs)};
  min-width: 0;
  flex: 1;
  padding-bottom: ${({ theme }) => theme.spacing(theme.gap.lg)};

  li:last-child > & {
    padding-bottom: 0;
  }
`;
