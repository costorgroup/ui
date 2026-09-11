import styled from '@emotion/styled';

export const SModalActions = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  margin-top: ${({ theme }) => theme.spacing(theme.gap.md)};
`;
