import styled from '@emotion/styled';

export const SDrawerHeadActions = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing(theme.gap.xs)};
  margin-left: auto;
  margin-top: -0.25rem;
  margin-right: -0.25rem;
`;
