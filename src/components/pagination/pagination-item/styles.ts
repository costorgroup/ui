import styled from '@emotion/styled';
import { Button } from '../../button';
import type { TButtonSize } from '../../button/types';

export const SPaginationItem = styled(Button)<{ size?: TButtonSize }>`
  box-sizing: border-box;
  min-width: ${({ theme, size = 'md' }) => theme.sizes[size].height};
  height: ${({ theme, size = 'md' }) => theme.sizes[size].height};
  padding: 0;
  flex-shrink: 0;
`;
