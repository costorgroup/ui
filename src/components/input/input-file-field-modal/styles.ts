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
  gap: ${({ theme }) => theme.spacing(theme.gap.xs)};
  width: 100%;
  max-height: 16rem;
  overflow: auto;
`;

export const SInputFileFieldModalRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(theme.gap.md)};
  padding: ${({ theme }) =>
    `${theme.spacing(theme.gap.sm)} ${theme.spacing(theme.gap.md)}`};
  border-radius: ${({ theme }) => theme.radius.small};
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.common.black} 3%,
    transparent
  );
`;

export const SInputFileFieldModalRowMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(theme.gap.xs)};
  min-width: 0;
`;

export const SInputFileFieldModalRowName = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.common.grey[17]};
`;

export const SInputFileFieldModalRowSize = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.common.grey[12]};
`;

export const SInputFileFieldModalEmpty = styled.div`
  padding: ${({ theme }) => theme.spacing(theme.gap.md)};
  text-align: center;
  color: ${({ theme }) => theme.colors.common.grey[12]};
  font-size: 0.875rem;
`;
