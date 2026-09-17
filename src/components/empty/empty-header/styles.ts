import styled from '@emotion/styled';

export const SEmptyHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  max-width: 24rem;
  min-width: 0;
`;
