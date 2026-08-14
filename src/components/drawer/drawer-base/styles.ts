import styled from '@emotion/styled';
import { Card } from '../../card';
import { TDrawerAnchor, TDrawerSize, TSDrawerBaseProps } from './types';

const sizeMap: Record<TDrawerSize, string> = {
  xs: '20rem',
  sm: '24rem',
  md: '35rem',
  lg: '48rem',
  xl: '64rem',
};

const customProps = new Set(['size', 'scrollable', 'anchor']);

const isHorizontal = (anchor: TDrawerAnchor) =>
  anchor === 'left' || anchor === 'right';

export const SDrawerBase = styled(Card, {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSDrawerBaseProps>`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: ${({ theme, anchor }) => {
    const radius = theme.radius.large;

    switch (anchor) {
      case 'left':
        return `0 ${radius} ${radius} 0`;
      case 'right':
        return `${radius} 0 0 ${radius}`;
      case 'top':
        return `0 0 ${radius} ${radius}`;
      case 'bottom':
        return `${radius} ${radius} 0 0`;
    }
  }};

  ${({ anchor, size, scrollable }) =>
    isHorizontal(anchor)
      ? `
    width: 100%;
    max-width: min(${sizeMap[size]}, 100%);
    ${
      scrollable
        ? `
      height: 100%;
      max-height: 100%;
      overflow: hidden;
    `
        : `
      min-height: 100%;
      height: auto;
      overflow: visible;
    `
    }
  `
      : `
    width: 100%;
    max-width: 100%;
    height: min(${sizeMap[size]}, 100%);
    max-height: ${scrollable ? '100%' : 'none'};
    overflow: hidden;
  `}
`;
