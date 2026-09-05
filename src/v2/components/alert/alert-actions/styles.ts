import styled from '@emotion/styled';

export const SAlertActions = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  margin-top: ${({ theme }) => theme.spacing(theme.gap.sm)};
`;
