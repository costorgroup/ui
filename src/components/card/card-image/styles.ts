import styled from '@emotion/styled';
import { cardImageClasses } from './classes';

export const SCardImage = styled.div`
  position: relative;
  display: block;
  width: 100%;
  flex-shrink: 0;

  .${cardImageClasses.media} {
    display: flex;
    width: 100%;
  }
`;

export const SCardImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing(theme.gap.sm)};
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
`;
