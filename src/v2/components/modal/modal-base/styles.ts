import styled from '@emotion/styled';
import { overlayZoom } from '../../../motion';
import { Panel } from '../../panel';
import { TModalSize, TSModalBaseProps } from './types';

const sizeMap: Record<TModalSize, string> = {
  xs: '20rem',
  sm: '24rem',
  md: '35rem',
  lg: '48rem',
  xl: '64rem',
};

const customProps = new Set(['size', 'scrollable']);

export const SModalBase = styled(Panel, {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSModalBaseProps>`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(theme.gap.md)};
  border-radius: ${({ theme }) => theme.radius.lg};
  margin: ${({ theme }) => theme.spacing(theme.gap.sm)};
  ${overlayZoom}

  ${({ theme, size, scrollable }) => {
    const inset = theme.spacing(theme.gap.sm);

    return `
      max-width: min(${sizeMap[size]}, calc(100% - ${inset} * 2));
      ${
        scrollable
          ? `
        max-height: calc(100% - ${inset} * 2);
        min-height: 0;
        overflow: hidden;
      `
          : `
        max-height: none;
        overflow: visible;
      `
      }
    `;
  }}
`;
