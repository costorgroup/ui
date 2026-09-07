import styled from '@emotion/styled';
import { TTheme } from '../../../theme/types';
import { colorMix } from '../../surface';
import {
  TCreditCardBrand,
  TSCreditCardFaceProps,
  TSCreditCardProps,
} from './types';

const customRoot = new Set(['rotate']);
const customFace = new Set(['brand', 'color']);

type TCardFace = {
  from: string;
  mid: string;
  to: string;
  glow: string;
  text: string;
};

const BRAND_FACE: Record<Exclude<TCreditCardBrand, 'unknown'>, TCardFace> = {
  visa: {
    from: '#1A237A',
    mid: '#1565C0',
    to: '#0D47A1',
    glow: '#64B5F6',
    text: '#FFFFFF',
  },
  mastercard: {
    from: '#1A1210',
    mid: '#3B1D18',
    to: '#111111',
    glow: '#E85D04',
    text: '#FFFFFF',
  },
  amex: {
    from: '#012169',
    mid: '#006FCF',
    to: '#004C97',
    glow: '#7EC8E3',
    text: '#FFFFFF',
  },
  discover: {
    from: '#9A3412',
    mid: '#EA580C',
    to: '#C2410C',
    glow: '#FDBA74',
    text: '#FFFFFF',
  },
  diners: {
    from: '#1B365D',
    mid: '#3D6B99',
    to: '#16324F',
    glow: '#A7C7E7',
    text: '#FFFFFF',
  },
  jcb: {
    from: '#071E4A',
    mid: '#0B4EA2',
    to: '#0A3A78',
    glow: '#60A5FA',
    text: '#FFFFFF',
  },
  unionpay: {
    from: '#7F1D1D',
    mid: '#1E3A8A',
    to: '#111827',
    glow: '#F87171',
    text: '#FFFFFF',
  },
  maestro: {
    from: '#0B1F3A',
    mid: '#0E4A7A',
    to: '#7F1D1D',
    glow: '#38BDF8',
    text: '#FFFFFF',
  },
  mir: {
    from: '#064E3B',
    mid: '#059669',
    to: '#14532D',
    glow: '#6EE7B7',
    text: '#FFFFFF',
  },
};

const faceFor = (
  brand: TCreditCardBrand,
  color: TSCreditCardFaceProps['color'],
  theme: TTheme,
): TCardFace => {
  if (brand !== 'unknown') {
    return BRAND_FACE[brand];
  }

  const palette = theme.colors[color];

  return {
    from: palette.light,
    mid: palette.main,
    to: palette.darker,
    glow: palette.lighter,
    text: palette.contrastText,
  };
};

export const SCreditCard = styled('div', {
  shouldForwardProp: (prop) => !customRoot.has(prop),
})<TSCreditCardProps>`
  position: relative;
  display: block;
  box-sizing: border-box;
  width: 100%;
  max-width: 22.5rem;
  aspect-ratio: 1.586;
  container-type: size;
  container-name: credit-card;
  perspective: 1200px;
`;

export const SCreditCardScene = styled('div', {
  shouldForwardProp: (prop) => !customRoot.has(prop),
})<TSCreditCardProps>`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: ${({ rotate }) => (rotate ? 'rotateY(180deg)' : 'rotateY(0deg)')};
  transition: transform 0.7s cubic-bezier(0.4, 0.12, 0.2, 1);
`;

export const SCreditCardFace = styled('div', {
  shouldForwardProp: (prop) => !customFace.has(prop),
})<TSCreditCardFaceProps>`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 8cqh 5.5cqw 7cqh;
  overflow: hidden;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 4cqw;
  color: ${({ theme, brand, color }) => faceFor(brand, color, theme).text};
  background:
    radial-gradient(
      120% 90% at 8% -8%,
      ${({ theme, brand, color }) =>
        colorMix(faceFor(brand, color, theme).glow, 38)} 0%,
      transparent 46%
    ),
    radial-gradient(
      80% 70% at 108% 112%,
      ${({ theme, brand, color }) =>
        colorMix(faceFor(brand, color, theme).glow, 22)} 0%,
      transparent 52%
    ),
    linear-gradient(
      125deg,
      ${colorMix('#ffffff', 18)} 0%,
      transparent 34%
    ),
    linear-gradient(
      155deg,
      ${({ theme, brand, color }) => faceFor(brand, color, theme).from} 0%,
      ${({ theme, brand, color }) => faceFor(brand, color, theme).mid} 48%,
      ${({ theme, brand, color }) => faceFor(brand, color, theme).to} 100%
    );
  box-shadow:
    0 1px 0 ${colorMix('#ffffff', 18)} inset,
    0 8cqh 11cqw ${colorMix('#000000', 28)};
  user-select: none;

  &[data-side='back'] {
    transform: rotateY(180deg);
    padding: 0;
  }
`;

export const SCreditCardHead = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 3.5cqw;
`;

export const SCreditCardRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3.5cqw;
`;

export const SCreditCardChip = styled.span`
  display: block;
  width: 11.5cqw;
  height: 13.4cqh;
  border-radius: 1.6cqw;
  background:
    linear-gradient(180deg, #f3e0a8 0%, #d4af37 46%, #b8860b 100%);
  box-shadow:
    inset 0 1px 0 ${colorMix('#ffffff', 50)},
    0 1px 2px ${colorMix('#000000', 25)};
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 20%;
    bottom: 20%;
    width: 1px;
    background: ${colorMix('#000000', 22)};
  }

  &::before {
    left: 33%;
  }

  &::after {
    left: 66%;
  }
`;

export const SCreditCardContactless = styled.span`
  display: inline-flex;
  width: 6.2cqw;
  height: 6.2cqw;
  opacity: 0.85;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const SCreditCardNumber = styled.div`
  margin-top: auto;
  font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace;
  font-size: 5.1cqw;
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 1.2;
  text-shadow: 0 1px 0 ${colorMix('#000000', 25)};
`;

export const SCreditCardMeta = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 4.5cqw;
  margin-top: 7cqh;
`;

export const SCreditCardField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1cqh;
  min-width: 0;
`;

export const SCreditCardLabel = styled.span`
  font-size: 2.6cqw;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.72;
`;

export const SCreditCardValue = styled.span`
  overflow: hidden;
  font-size: 3.5cqw;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SCreditCardBrand = styled.span`
  position: absolute;
  top: 8cqh;
  right: 5.5cqw;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  width: 20cqw;
  height: 30cqh;
  overflow: hidden;
  line-height: 0;
  pointer-events: none;
  color: inherit;

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  [data-side='back'] & {
    top: auto;
    bottom: 7cqh;
  }
`;

export const SCreditCardStripe = styled.div`
  height: 22%;
  margin-top: 8%;
  background: ${colorMix('#000000', 82)};
`;

export const SCreditCardPanel = styled.div`
  display: flex;
  align-items: center;
  gap: 2.7cqw;
  margin: 7cqh 5cqw 0;
`;

export const SCreditCardSignature = styled.div`
  flex: 1;
  height: 15cqh;
  border-radius: 0.9cqw;
  background: repeating-linear-gradient(
    -12deg,
    #f4f0e8,
    #f4f0e8 1.3cqh,
    #e4ddd0 1.3cqh,
    #e4ddd0 2.6cqh
  );
`;

export const SCreditCardCvv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 14cqw;
  height: 15cqh;
  padding: 0 2.2cqw;
  border-radius: 0.9cqw;
  background: ${({ theme }) => theme.colors.common.white};
  color: ${({ theme }) => theme.colors.common.black};
  font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace;
  font-size: 4cqw;
  font-weight: 700;
  letter-spacing: 0.12em;
`;

export const SCreditCardBackMeta = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 4.5cqw;
  margin: auto 5cqw 7cqh;
  padding-right: 22cqw;
`;
