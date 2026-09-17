import styled from '@emotion/styled';
import { colorMix } from '../../../helpers/variant-styles/surface';

export const SStepContent = styled.div`
  box-sizing: border-box;
  font-family: inherit;
  font-size: var(--stepper-description-size);
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  color: ${({ theme }) => colorMix(theme.surfaces.ink, 84)};
  padding-top: ${({ theme }) => theme.spacing(theme.gap.xs)};
`;
