import styled from '@emotion/styled';

export const SAppBarItems = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-end;
  gap: var(--app-bar-gap, ${({ theme }) => theme.spacing(theme.gap.md)});
  min-width: 0;
  margin-left: auto;
`;
