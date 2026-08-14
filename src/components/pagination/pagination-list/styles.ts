import styled from '@emotion/styled';

export const SPaginationList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(theme.gap.xs)};
  margin: 0;
  padding: 0;
  list-style: none;
`;
