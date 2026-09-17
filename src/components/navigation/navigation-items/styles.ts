import styled from '@emotion/styled';

export const SNavigationItems = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-end;
  gap: var(--navigation-gap, ${({ theme }) => theme.spacing(theme.gap.sm)});
  min-width: 0;
  margin-left: auto;
`;
