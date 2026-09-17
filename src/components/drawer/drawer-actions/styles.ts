import styled from '@emotion/styled';

export const SDrawerActions = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: stretch;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  margin-top: ${({ theme }) => theme.spacing(theme.gap.md)};

  & > * {
    width: 100%;
  }
`;
