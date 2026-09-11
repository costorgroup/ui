import styled from '@emotion/styled';
import { TGap, TTheme } from '../../../theme/types';
import { TFloatingLayout } from './data';
import { TFloatingInset } from './types';

type TSFloatingSlotProps = {
  top?: TFloatingInset;
  right?: TFloatingInset;
  bottom?: TFloatingInset;
  left?: TFloatingInset;
  center?: 'x' | 'y';
  flexDirection?: TFloatingLayout['flexDirection'];
};

const customProps = new Set([
  'top',
  'right',
  'bottom',
  'left',
  'center',
  'flexDirection',
]);

const toInset = (theme: TTheme, value?: TFloatingInset) => {
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

export const SFloatingSlot = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSFloatingSlotProps>`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.fab};
  display: flex;
  flex-direction: ${({ flexDirection = 'column-reverse' }) => flexDirection};
  align-items: center;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  top: ${({ theme, top }) => toInset(theme, top)};
  right: ${({ theme, right }) => toInset(theme, right)};
  bottom: ${({ theme, bottom }) => toInset(theme, bottom)};
  left: ${({ theme, left }) => toInset(theme, left)};
  transform: ${({ center }) =>
    center === 'x'
      ? 'translateX(-50%)'
      : center === 'y'
        ? 'translateY(-50%)'
        : undefined};
`;
