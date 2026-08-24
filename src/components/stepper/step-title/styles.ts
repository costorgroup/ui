import styled from '@emotion/styled';

export const SStepTitle = styled.p`
  margin: 0;
  font-family: inherit;
  font-size: var(--stepper-title-size);
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeight.heading};
  color: ${({ theme }) => theme.colors.default.main};
`;
