import styled from '@emotion/styled';
import { Card } from '../../card';
import { TModalSize, TSModalBaseProps } from './types';

const sizeMap: Record<TModalSize, string> = {
  xs: '20rem',
  sm: '24rem',
  md: '35rem',
  lg: '48rem',
  xl: '64rem',
};

const customProps = new Set(['size', 'scrollable']);

export const SModalBase = styled(Card, {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSModalBaseProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${({ size }) => sizeMap[size]};
  max-height: ${({ scrollable }) => (scrollable ? '100%' : 'none')};
  margin: auto;
  overflow: hidden;
  box-sizing: border-box;
`;
