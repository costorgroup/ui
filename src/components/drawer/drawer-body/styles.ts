import styled from '@emotion/styled';

export const SDrawerBody = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  color: ${({ theme }) => theme.surfaces.ink};
`;

export const SDrawerBodyPlain = styled.div`
  flex: 1 0 auto;
  min-height: auto;
  overflow: visible;
  color: ${({ theme }) => theme.surfaces.ink};
`;
