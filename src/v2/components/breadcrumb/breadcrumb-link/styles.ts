import styled from '@emotion/styled';

export const SBreadcrumbLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(theme.gap.xs)};
  color: inherit;
  text-decoration: none;
  font: inherit;
  cursor: pointer;
  transition: color 0.15s ease;
`;
