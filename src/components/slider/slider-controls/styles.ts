import styled from '@emotion/styled';

export const SSliderControls = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;
  padding: ${({ theme }) => theme.spacing(theme.gap.md)};
`;
