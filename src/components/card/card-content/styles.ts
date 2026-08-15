import styled from '@emotion/styled';

export const SCardContent = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  min-width: 0;
  padding: ${({ theme }) => theme.spacing(theme.gap.xl)};
`;
