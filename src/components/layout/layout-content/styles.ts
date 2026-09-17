import styled from '@emotion/styled';
import { TSLayoutContentProps } from '../types';

const customProps = new Set(['width', 'height', 'flex']);

const toSize = (value: string | number | undefined) => {
  if (value == null) {
    return undefined;
  }

  return typeof value === 'number' ? `${value}px` : value;
};

export const SLayoutContent = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSLayoutContentProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  flex: ${({ flex, width, height }) => {
    if (flex != null) {
      return flex;
    }

    if (width != null || height != null) {
      return '0 0 auto';
    }

    return '1 1 auto';
  }};
  width: ${({ width }) => toSize(width)};
  height: ${({ height }) => toSize(height)};
`;
