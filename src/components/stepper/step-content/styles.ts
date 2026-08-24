import styled from '@emotion/styled';

export const SStepContent = styled.div`
  box-sizing: border-box;
  font-family: inherit;
  font-size: var(--stepper-description-size);
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  color: ${({ theme }) => theme.colors.default.main};
  padding-top: ${({ theme }) => theme.spacing(theme.gap.xs)};
`;
