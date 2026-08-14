import styled from '@emotion/styled';
import { TButtonSize } from '../../button/types';

const sizeBox: Record<TButtonSize, string> = {
  xs: '1.75rem',
  sm: '2rem',
  md: '2.25rem',
  lg: '2.75rem',
  xl: '3.25rem',
};

const customProps = new Set(['size']);

export const SPaginationEllipsis = styled('span', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<{ size?: TButtonSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: ${({ size = 'md' }) => sizeBox[size]};
  height: ${({ size = 'md' }) => sizeBox[size]};
  color: ${({ theme }) => theme.colors.common.grey[12]};
  user-select: none;
`;
