import styled from '@emotion/styled';

export const SItemActions = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: var(--item-actions-gap, ${({ theme }) => theme.spacing(theme.gap.sm)});
  margin-left: auto;
`;
