import styled from '@emotion/styled';
import { colorMix } from '../../../helpers/variant-styles/surface';

const customProps = new Set(['hard', 'flipped', 'zIndex', 'isFlipping']);

type TSFlipbookPageProps = {
  hard?: boolean;
  flipped?: boolean;
  zIndex?: number;
  isFlipping?: boolean;
};

export const SFlipbookPage = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSFlipbookPageProps>`
  position: absolute;
  inset: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  transform-origin: left center;
  transform-style: preserve-3d;
  z-index: ${({ zIndex = 0 }) => zIndex};
  transform: ${({ flipped }) =>
    flipped ? 'rotateY(-180deg)' : 'rotateY(0deg)'};
  transition: ${({ isFlipping }) =>
    isFlipping
      ? 'transform var(--cui-flipbook-flip-ms, 700ms) ease-in-out'
      : 'none'};
  cursor: pointer;
  border-radius: ${({ theme, hard }) =>
    hard ? theme.radius.medium : theme.radius.small};
  box-shadow: ${({ theme }) => {
    const black = theme.palette.common.black;
    return `
      0 1px 2px ${colorMix(black, 12)},
      0 8px 24px ${colorMix(black, 14)}
    `;
  }};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.palette.primary.main};
    outline-offset: 2px;
  }
`;

/** Book pages read as physical paper, so the face/back colors stay fixed
 * off-whites rather than following the app's light/dark surfaces. */
export const SFlipbookPageFace = styled.div`
  position: absolute;
  inset: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  background: ${({ theme }) => theme.palette.common.white};
  border-radius: inherit;
`;

export const SFlipbookPageFront = styled(SFlipbookPageFace)`
  display: flex;
  flex-direction: column;
  transform: rotateY(0deg);
`;

export const SFlipbookPageBack = styled(SFlipbookPageFace)`
  transform: rotateY(180deg);
  background: ${({ theme }) => theme.palette.common.grey[2]};
  background-image: linear-gradient(
    90deg,
    ${({ theme }) => theme.palette.common.grey[4]} 0%,
    ${({ theme }) => theme.palette.common.grey[1]} 12%,
    ${({ theme }) => theme.palette.common.grey[2]} 100%
  );
`;
