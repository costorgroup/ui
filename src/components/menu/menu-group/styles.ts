import styled from '@emotion/styled';

export const SMenuGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(theme.gap.xs)};

  & + & {
    margin-top: ${({ theme }) => theme.spacing(theme.gap.xs)};
    padding-top: ${({ theme }) => theme.spacing(theme.gap.xs)};
    border-top: 1px solid ${({ theme }) => theme.palette.common.grey[7]};
  }
`;
