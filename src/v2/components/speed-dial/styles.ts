import styled from '@emotion/styled';
import { TGap, TTheme } from '../../../theme/types';
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
  open?: boolean;
};

const rootProps = new Set(['flexDirection', 'gap']);
const itemsProps = new Set(['itemsGap', 'itemsDirection', 'itemOffset', 'open']);

const SPRING = 'cubic-bezier(0.34, 1.25, 0.64, 1)';
const STAGGER_MS = 42;
const MAX_STAGGER_ITEMS = 8;

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

const staggerRules = (openSelector: string, closedSelector: string) =>
  Array.from({ length: MAX_STAGGER_ITEMS }, (_, index) => {
    const openDelay = index * STAGGER_MS;
    const closeDelay = (MAX_STAGGER_ITEMS - 1 - index) * STAGGER_MS;

    return `
      ${openSelector} > *:nth-of-type(${index + 1}) {
        transition-delay: ${openDelay}ms;
      }

      ${closedSelector} > *:nth-of-type(${index + 1}) {
        transition-delay: ${closeDelay}ms;
      }
    `;
  }).join('');

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
  filter: drop-shadow(
    0 8px 18px color-mix(in lab, ${({ theme }) => theme.colors.common.black} 22%, transparent)
  );
`;

export const SSpeedDialTriggerIcon = styled.span<{ open?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.38s ${SPRING};

  &[data-open='true'] {
    transform: rotate(45deg);
  }
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

  ${({ itemsDirection = 'column-reverse' }) => {
    switch (itemsDirection) {
      case 'column':
        return `
          top: 100%;
          left: 50%;
          padding-top: var(--speed-dial-gap);
          transform: translateX(-50%);
        `;
      case 'row':
        return `
          left: 100%;
          top: 50%;
          padding-left: var(--speed-dial-gap);
          transform: translateY(-50%);
        `;
      case 'row-reverse':
        return `
          right: 100%;
          top: 50%;
          padding-right: var(--speed-dial-gap);
          transform: translateY(-50%);
        `;
      case 'column-reverse':
      default:
        return `
          bottom: 100%;
          left: 50%;
          padding-bottom: var(--speed-dial-gap);
          transform: translateX(-50%);
        `;
    }
  }}

  & > * {
    opacity: 0;
    transform: scale(0.55) ${({ itemOffset = 'translateY(10px)' }) => itemOffset};
    transition:
      opacity 0.32s ${SPRING},
      transform 0.32s ${SPRING};
    will-change: transform, opacity;
  }

  &[data-open='true'] {
    visibility: visible;
    pointer-events: auto;
  }

  &[data-open='true'] > * {
    opacity: 1;
    transform: scale(1);
  }

  ${staggerRules("&[data-open='true']", "&:not([data-open='true'])")}
`;
