import styled from '@emotion/styled';

export const SBlockquoteBase = styled.blockquote`
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: ${({ theme }) => theme.spacing(theme.gap.md)};
`;

export const SBlockquoteStack = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  min-width: 0;
`;
