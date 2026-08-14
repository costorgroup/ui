import styled from '@emotion/styled';
import { Button } from '../../button';
import { TButtonSize } from '../../button/types';

const sizeBox: Record<TButtonSize, string> = {
  xs: '1.75rem',
  sm: '2rem',
  md: '2.25rem',
  lg: '2.75rem',
  xl: '3.25rem',
};

const customProps = new Set(['selected']);

export const SPaginationItem = styled(Button, {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<{ selected?: boolean; size?: TButtonSize }>`
  box-sizing: border-box;
  min-width: ${({ size = 'md' }) => sizeBox[size]};
  height: ${({ size = 'md' }) => sizeBox[size]};
  padding: 0;
  flex-shrink: 0;
`;
