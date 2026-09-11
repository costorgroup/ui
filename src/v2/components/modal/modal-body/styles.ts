import styled from '@emotion/styled';

export const SModalBody = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  color: ${({ theme }) => theme.surfaces.ink};
`;

export const SModalBodyPlain = styled.div`
  flex: 1 0 auto;
  min-height: auto;
  overflow: visible;
  color: ${({ theme }) => theme.surfaces.ink};
`;
