import styled from '@emotion/styled';

export const SItemTitle = styled.h3`
  margin: 0;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: inherit;
  font-size: var(--item-title-size, ${({ theme }) => theme.sizes.md.fontSize});
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeight.heading};
  color: ${({ theme }) => theme.surfaces.ink};
`;
