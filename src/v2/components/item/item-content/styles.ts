import styled from '@emotion/styled';

export const SItemContent = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: center;
  gap: var(--item-content-gap, ${({ theme }) => theme.spacing(theme.gap.xs)});
  min-width: 0;
`;
