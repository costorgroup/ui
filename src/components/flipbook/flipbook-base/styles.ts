import styled from '@emotion/styled';
import { colorMix } from '../../../helpers/variant-styles/surface';

const customProps = new Set([
  'bookWidth',
  'bookHeight',
  'flippingTime',
  'showCover',
]);

type TSFlipbookBaseProps = {
  bookWidth: number | string;
  bookHeight: number | string;
  flippingTime: number;
};

export const SFlipbookBase = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSFlipbookBaseProps>`
  --cui-flipbook-width: ${({ bookWidth }) =>
    typeof bookWidth === 'number' ? `${bookWidth}px` : bookWidth};
  --cui-flipbook-height: ${({ bookHeight }) =>
    typeof bookHeight === 'number' ? `${bookHeight}px` : bookHeight};
  --cui-flipbook-flip-ms: ${({ flippingTime }) => `${flippingTime}ms`};

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  /* Definite width from prop (avoid % collapse); 2× for open spread */
  width: calc(var(--cui-flipbook-width) * 2);
  max-width: 100%;
  margin-inline: auto;
`;

export const SFlipbookStage = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: var(--cui-flipbook-height);
  overflow: visible;
  perspective: 2200px;
  perspective-origin: center center;
`;

type TSFlipbookBookProps = {
  opened: boolean;
};

export const SFlipbookBook = styled('div', {
  shouldForwardProp: (prop) => prop !== 'opened',
})<TSFlipbookBookProps>`
  position: absolute;
  top: 0;
  left: 50%;
  box-sizing: border-box;
  /* Page size follows width prop; shrink only when stage is constrained */
  width: var(--cui-flipbook-width);
  max-width: 50%;
  height: var(--cui-flipbook-height);
  transform-style: preserve-3d;
  transform: ${({ opened }) =>
    opened ? 'translate3d(0, 0, 0)' : 'translate3d(-50%, 0, 0)'};
  transition: transform var(--cui-flipbook-flip-ms, 700ms) ease-in-out;
  user-select: none;
  touch-action: pan-y;
`;

export const SFlipbookControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const SFlipbookStatus = styled.span`
  min-width: 4.5rem;
  text-align: center;
  font-size: ${({ theme }) => theme.typography.text.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  color: ${({ theme }) => colorMix(theme.surfaces.ink, 64)};
`;
