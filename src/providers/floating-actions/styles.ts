import styled from '@emotion/styled';
import { TGap, TTheme } from '../../theme/types';
import { TFloatingActionsLayout } from './data';
import { TFloatingActionsInset } from './types';

type TSFloatingActionsSlotProps = {
  top?: TFloatingActionsInset;
  right?: TFloatingActionsInset;
  bottom?: TFloatingActionsInset;
  left?: TFloatingActionsInset;
  center?: 'x' | 'y';
  flexDirection?: TFloatingActionsLayout['flexDirection'];
};

const customProps = new Set([
  'top',
  'right',
  'bottom',
  'left',
  'center',
  'flexDirection',
]);

const toInset = (theme: TTheme, value?: TFloatingActionsInset) => {
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

export const SFloatingActionsSlot = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSFloatingActionsSlotProps>`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.speedDial};
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
