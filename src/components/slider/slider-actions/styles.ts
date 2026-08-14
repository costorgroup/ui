import styled from '@emotion/styled';

export const SSliderActions = styled.div`
  position: absolute;
  inset: ${({ theme }) => theme.spacing(theme.gap.md)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }
`;
