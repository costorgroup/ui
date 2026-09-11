import styled from '@emotion/styled';

export const SItemDescription = styled.p`
  margin: 0;
  min-width: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-family: inherit;
  font-size: var(
    --item-description-size,
    ${({ theme }) => theme.sizes.sm.fontSize}
  );
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  color: ${({ theme }) => theme.surfaces.muted};
`;
