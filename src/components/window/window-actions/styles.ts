import styled from '@emotion/styled';

export const SWindowActions = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  margin-top: ${({ theme }) => theme.spacing(theme.gap.md)};
`;
