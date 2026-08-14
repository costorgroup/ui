import styled from '@emotion/styled';
import { TGap, TTheme } from '../../theme/types';
import { TFixedInset, TFixedOwnProps } from './types';

type TSFixedProps = Pick<TFixedOwnProps, 'top' | 'right' | 'bottom' | 'left'>;

const customProps = new Set(['top', 'right', 'bottom', 'left']);

const toInset = (theme: TTheme, value?: TFixedInset) => {
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

export const SFixed = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSFixedProps>`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.fixedContent};
  top: ${({ theme, top }) => toInset(theme, top)};
  right: ${({ theme, right }) => toInset(theme, right)};
  bottom: ${({ theme, bottom }) => toInset(theme, bottom)};
  left: ${({ theme, left }) => toInset(theme, left)};
`;
