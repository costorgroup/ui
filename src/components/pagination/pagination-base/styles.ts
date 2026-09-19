import styled from '@emotion/styled';
import { TSPaginationBaseProps } from './types';

const customProps = new Set(['fullWidth']);

export const SPaginationBase = styled('nav', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSPaginationBaseProps>`
  display: ${({ fullWidth }) => (fullWidth ? 'flex' : 'inline-flex')};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  max-width: 100%;
`;
