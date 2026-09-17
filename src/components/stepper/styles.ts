import styled from '@emotion/styled';
import { resolveTrackColor, TTrackVariant } from '../../helpers/variant-styles/track-variant-styles';
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

/** Outline/plain steppers don't have a filled indicator, so their connecting
 * line falls back to the same neutral chrome track as subtle/surface. */
const trackVariant = (variant: TSStepperProps['variant']): TTrackVariant =>
  variant === 'outline' || variant === 'plain' ? 'subtle' : variant;

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
  --stepper-error: ${({ theme }) => theme.palette.error.main};
  --stepper-fill: ${({ theme, color }) => {
    const palette = theme.palette[color];
    return palette === theme.palette.default ? theme.surfaces.ink : palette.main;
  }};
  --stepper-track: ${({ theme, color, variant }) => {
    const palette = theme.palette[color];
    return resolveTrackColor(trackVariant(variant), palette, theme);
  }};

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
