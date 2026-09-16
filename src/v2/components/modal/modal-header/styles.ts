import styled from '@emotion/styled';

export const SModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  flex-shrink: 0;
  margin-bottom: ${({ theme }) => theme.spacing(theme.gap.md)};
`;

export const SModalHeaderMain = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  gap: ${({ theme }) => theme.spacing(theme.gap.xs)};
`;
