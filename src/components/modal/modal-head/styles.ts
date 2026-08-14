import styled from '@emotion/styled';

export const SModalHead = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(theme.gap.md)};
  flex-shrink: 0;
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

export const SModalHeadContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const SModalHeadClose = styled.div`
  flex-shrink: 0;
  margin-top: -0.25rem;
  margin-right: -0.25rem;
`;
