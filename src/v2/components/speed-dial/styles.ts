import styled from '@emotion/styled';
import { TGap, TTheme } from '../../../theme/types';
import { MOTION, reduceMotion } from '../../motion';
import { paperShadow } from '../../surface';
import { TSpeedDialLayout } from './data';
import { TSpeedDialInset } from './types';

type TSSpeedDialProps = {
  flexDirection?: TSpeedDialLayout['flexDirection'];
  gap?: TSpeedDialInset;
};

type TSSpeedDialItemsProps = {
  itemsGap?: TSpeedDialInset;
  itemsDirection?: TSpeedDialLayout['itemsDirection'];
  itemOffset?: string;
};

const rootProps = new Set(['flexDirection', 'gap']);
const itemsProps = new Set(['itemsGap', 'itemsDirection', 'itemOffset']);

const STAGGER_MS = 56;
const MAX_STAGGER_ITEMS = 8;
const OPEN_MS = 360;
const CLOSE_MS = 180;
const POP = 'cubic-bezier(0.22, 1.45, 0.32, 1)';

const toInset = (theme: TTheme, value?: TSpeedDialInset) => {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value === 'number') {
    return theme.spacing(value);
  }

  if (value in theme.gap) {
    return theme.spacing(theme.gap[value as TGap]);
  }

  return value;
};

const staggerRules = () =>
  Array.from({ length: MAX_STAGGER_ITEMS }, (_, index) => {
    const openDelay = index * STAGGER_MS;

    return `
      &[data-open='true'] > *:nth-of-type(${index + 1}) {
        transition-delay: ${openDelay}ms;
      }
    `;
  }).join('');

const itemsPlacement = (itemsDirection: TSpeedDialLayout['itemsDirection']) => {
  switch (itemsDirection) {
    case 'column':
      return `
        top: 100%;
        left: 50%;
        padding-top: var(--speed-dial-gap);
        transform: translateX(-50%);
        --speed-dial-origin: 50% 0%;
      `;
    case 'row':
      return `
        left: 100%;
        top: 50%;
        padding-left: var(--speed-dial-gap);
        transform: translateY(-50%);
        --speed-dial-origin: 0% 50%;
      `;
    case 'row-reverse':
      return `
        right: 100%;
        top: 50%;
        padding-right: var(--speed-dial-gap);
        transform: translateY(-50%);
        --speed-dial-origin: 100% 50%;
      `;
    case 'column-reverse':
    default:
      return `
        bottom: 100%;
        left: 50%;
        padding-bottom: var(--speed-dial-gap);
        transform: translateX(-50%);
        --speed-dial-origin: 50% 100%;
      `;
  }
};

export const SSpeedDial = styled('div', {
  shouldForwardProp: (prop) => !rootProps.has(prop),
})<TSSpeedDialProps>`
  position: relative;
  display: flex;
  flex-direction: ${({ flexDirection = 'column-reverse' }) => flexDirection};
  align-items: center;
  --speed-dial-gap: ${({ theme, gap = 'md' }) => toInset(theme, gap)};
`;

export const SSpeedDialTriggerWrap = styled.span`
  position: relative;
  z-index: 1;
  display: inline-flex;
  border-radius: inherit;
  box-shadow: ${({ theme }) => paperShadow(theme, 4)};
`;

export const SSpeedDialTriggerIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform ${MOTION.duration} ${MOTION.easing};

  &[data-open='true'] {
    transform: rotate(45deg);
  }

  ${reduceMotion}
`;

export const SSpeedDialItems = styled('div', {
  shouldForwardProp: (prop) => !itemsProps.has(prop),
})<TSSpeedDialItemsProps>`
  position: absolute;
  display: flex;
  flex-direction: ${({ itemsDirection = 'column-reverse' }) => itemsDirection};
  align-items: center;
  gap: ${({ theme, itemsGap = 'sm' }) => toInset(theme, itemsGap)};
  visibility: hidden;
  pointer-events: none;
  transition: visibility 0s linear ${CLOSE_MS}ms;

  ${({ itemsDirection = 'column-reverse' }) => itemsPlacement(itemsDirection)}

  & > * {
    opacity: 0;
    transform-origin: var(--speed-dial-origin);
    transform: scale(0.28)
      ${({ itemOffset = 'translateY(16px)' }) => itemOffset};
    transition:
      opacity ${CLOSE_MS}ms ease-in,
      transform ${CLOSE_MS}ms ease-in;
    will-change: transform, opacity;
    ${reduceMotion}
  }

  &[data-open='true'] {
    visibility: visible;
    pointer-events: auto;
    transition: visibility 0s;
  }

  &[data-open='true'] > * {
    opacity: 1;
    transform: scale(1);
    transition:
      opacity ${OPEN_MS}ms ${POP},
      transform ${OPEN_MS}ms ${POP};
  }

  ${staggerRules()}
`;
