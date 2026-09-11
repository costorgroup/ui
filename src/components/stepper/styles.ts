import styled from '@emotion/styled';
import { TSStepperProps } from './types';

const customProps = new Set([
  'orientation',
  'alternativeLabel',
  'color',
  'variant',
  'size',
]);

const indicatorSize: Record<TSStepperProps['size'], string> = {
  sm: '1.5rem',
  md: '2rem',
  lg: '2.5rem',
};

const titleSize: Record<TSStepperProps['size'], string> = {
  sm: '0.8125rem',
  md: '0.875rem',
  lg: '1rem',
};

const descriptionSize: Record<TSStepperProps['size'], string> = {
  sm: '0.75rem',
  md: '0.8125rem',
  lg: '0.875rem',
};

export const SStepper = styled('ol', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSStepperProps>`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  --stepper-indicator-size: ${({ size }) => indicatorSize[size]};
  --stepper-title-size: ${({ size }) => titleSize[size]};
  --stepper-description-size: ${({ size }) => descriptionSize[size]};
  --stepper-gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  --stepper-main: ${({ theme, color }) => theme.palette[color].main};
  --stepper-dark: ${({ theme, color }) => theme.palette[color].dark};
  --stepper-darker: ${({ theme, color }) => theme.palette[color].darker};
  --stepper-contrast: ${({ theme, color }) => theme.palette[color].contrastText};
  --stepper-track: ${({ theme, color }) =>
    `color-mix(in oklab, ${theme.palette[color].main} 22%, transparent)`};
  --stepper-error: ${({ theme }) => theme.palette.error.main};

  ${({ orientation, alternativeLabel }) =>
    orientation === 'horizontal'
      ? `
    flex-direction: row;
    align-items: ${alternativeLabel ? 'flex-start' : 'center'};
  `
      : `
    flex-direction: column;
    align-items: stretch;
  `}
`;
