import styled from '@emotion/styled';

export const SStepDescription = styled.p`
  margin: 0;
  font-family: inherit;
  font-size: var(--stepper-description-size);
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  color: ${({ theme }) =>
    `color-mix(in srgb, ${theme.colors.default.main} 68%, transparent)`};
`;
