import styled from '@emotion/styled';

export const SCardDescription = styled.p`
  margin: 0;
  min-width: 0;
  grid-column: 1;
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.text.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  color: ${({ theme }) => theme.surfaces.muted};
`;
