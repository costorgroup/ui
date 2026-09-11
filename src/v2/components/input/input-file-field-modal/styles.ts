import styled from '@emotion/styled';

export const SInputFileFieldModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(theme.gap.lg)};
  width: 100%;
`;

export const SInputFileFieldModalList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  width: 100%;
  max-height: 16rem;
  overflow: auto;
`;
