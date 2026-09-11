import styled from "@emotion/styled";

export const SWindowContent = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(theme.gap.xs)};
  min-width: 0;
  color: ${({ theme }) => theme.palette.default.main};
`;

