import styled from '@emotion/styled';

export const SEmptyTitle = styled.h3`
  margin: 0;
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.heading.h6};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeight.heading};
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.surfaces.ink};
`;
