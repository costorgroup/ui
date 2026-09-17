import styled from '@emotion/styled';
import { colorMix } from '../../../helpers/variant-styles/surface';

export const SStepDescription = styled.p`
  margin: 0;
  font-family: inherit;
  font-size: var(--stepper-description-size);
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  color: ${({ theme }) => colorMix(theme.surfaces.ink, 68)};
`;
