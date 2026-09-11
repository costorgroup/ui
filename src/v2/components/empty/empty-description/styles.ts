import styled from '@emotion/styled';

export const SEmptyDescription = styled.p`
  margin: 0;
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.text.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  color: ${({ theme }) => theme.surfaces.muted};

  a {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }

  a:hover {
    color: ${({ theme }) => theme.surfaces.ink};
  }
`;
