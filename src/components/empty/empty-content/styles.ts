import styled from '@emotion/styled';

export const SEmptyContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(theme.gap.md)};
  width: 100%;
  max-width: 24rem;
  min-width: 0;
`;
