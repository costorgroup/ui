import styled from '@emotion/styled';

export const SModalDescription = styled.p`
  margin: 0;
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.text.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  color: ${({ theme }) => theme.surfaces.muted};
`;
