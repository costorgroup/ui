import styled from '@emotion/styled';
import type { TButtonSize } from '../../button/types';

const customProps = new Set(['size']);

export const SPaginationEllipsis = styled('span', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<{ size?: TButtonSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: ${({ theme, size = 'md' }) => theme.sizes[size].height};
  height: ${({ theme, size = 'md' }) => theme.sizes[size].height};
  color: ${({ theme }) => theme.surfaces.muted};
  user-select: none;
  pointer-events: none;
  line-height: 0;

  & svg {
    width: ${({ theme, size = 'md' }) => theme.sizes[size].icon};
    height: ${({ theme, size = 'md' }) => theme.sizes[size].icon};
  }
`;
