import styled from '@emotion/styled';
import { overlaySlide } from '../../../motion';
import { Panel } from '../../panel';
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

export const SDrawerBase = styled(Panel, {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSDrawerBaseProps>`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: ${({ theme }) => theme.spacing(theme.gap.md)};
  border-radius: ${({ theme }) => theme.radius.lg};
  margin: ${({ theme }) => theme.spacing(theme.gap.sm)};
  ${({ anchor }) => overlaySlide(anchor)}

  ${({ theme, anchor, size, scrollable }) => {
    const inset = theme.spacing(theme.gap.sm);

    return isHorizontal(anchor)
      ? `
    width: 100%;
    max-width: min(${sizeMap[size]}, calc(100% - ${inset} * 2));
    ${
      scrollable
        ? `
      align-self: stretch;
      min-height: 0;
      height: auto;
      overflow: hidden;
    `
        : `
      min-height: calc(100% - ${inset} * 2);
      height: auto;
      overflow: visible;
    `
    }
  `
      : `
    width: calc(100% - ${inset} * 2);
    max-width: none;
    height: min(${sizeMap[size]}, calc(100% - ${inset} * 2));
    max-height: calc(100% - ${inset} * 2);
    overflow: ${scrollable ? 'hidden' : 'visible'};
  `;
  }}
`;
