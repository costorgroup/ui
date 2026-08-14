import styled from '@emotion/styled';
import { TGap, TTheme } from '../../theme/types';
import { TSpeedDialLayout } from './data';
import { TSpeedDialInset } from './types';

type TSSpeedDialProps = {
  flexDirection?: TSpeedDialLayout['flexDirection'];
  gap?: TSpeedDialInset;
};

type TSSpeedDialItemsProps = {
  itemsGap?: TSpeedDialInset;
  itemsDirection?: TSpeedDialLayout['itemsDirection'];
  open?: boolean;
};

const rootProps = new Set(['flexDirection', 'gap']);
const itemsProps = new Set(['itemsGap', 'itemsDirection', 'open']);

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

export const SSpeedDial = styled('div', {
  shouldForwardProp: (prop) => !rootProps.has(prop),
})<TSSpeedDialProps>`
  position: relative;
  display: flex;
  flex-direction: ${({ flexDirection = 'column-reverse' }) => flexDirection};
  align-items: center;
  --speed-dial-gap: ${({ theme, gap = 'md' }) => toInset(theme, gap)};
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
  transform: scale(0.7);
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    visibility 0s linear 0.2s;

  ${({ itemsDirection = 'column-reverse' }) => {
    switch (itemsDirection) {
      case 'column':
        return `
          top: 100%;
          left: 50%;
          padding-top: var(--speed-dial-gap);
          transform: translateX(-50%) scale(0.7);
          transform-origin: top center;
        `;
      case 'row':
        return `
          left: 100%;
          top: 50%;
          padding-left: var(--speed-dial-gap);
          transform: translateY(-50%) scale(0.7);
          transform-origin: left center;
        `;
      case 'row-reverse':
        return `
          right: 100%;
          top: 50%;
          padding-right: var(--speed-dial-gap);
          transform: translateY(-50%) scale(0.7);
          transform-origin: right center;
        `;
      case 'column-reverse':
      default:
        return `
          bottom: 100%;
          left: 50%;
          padding-bottom: var(--speed-dial-gap);
          transform: translateX(-50%) scale(0.7);
          transform-origin: bottom center;
        `;
    }
  }}

  &[data-open='true'] {
    visibility: visible;
    pointer-events: auto;
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
      visibility 0s;
  }

  &[data-open='true'][data-items-direction='column'] {
    transform: translateX(-50%) scale(1);
  }

  &[data-open='true'][data-items-direction='row'] {
    transform: translateY(-50%) scale(1);
  }

  &[data-open='true'][data-items-direction='row-reverse'] {
    transform: translateY(-50%) scale(1);
  }

  &[data-open='true'][data-items-direction='column-reverse'] {
    transform: translateX(-50%) scale(1);
  }
`;

export const SSpeedDialIconWrap = styled.span`
  display: grid;
  place-items: center;
`;

export const SSpeedDialIcon = styled.span`
  display: flex;
  grid-area: 1 / 1;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &[data-slot='icon'] {
    transform: rotate(0deg);
    opacity: 1;
  }

  &[data-slot='icon'][data-open='true'] {
    transform: rotate(90deg);
    opacity: 0;
  }

  &[data-slot='close'] {
    transform: rotate(-90deg);
    opacity: 0;
  }

  &[data-slot='close'][data-open='true'] {
    transform: rotate(0deg);
    opacity: 1;
  }
`;
