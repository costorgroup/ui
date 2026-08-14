import styled from '@emotion/styled';
import { TSSliderPaginationDotProps } from './types';

export const SSliderPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(theme.gap.xs)};
  pointer-events: auto;
  margin-top: auto;
`;

const customProps = new Set(['active', 'color']);

export const SSliderPaginationDot = styled('button', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSSliderPaginationDotProps>`
  box-sizing: border-box;
  width: ${({ active }) => (active ? '1.25rem' : '0.5rem')};
  height: 0.5rem;
  padding: 0;
  border: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  cursor: pointer;
  background-color: ${({ theme, color, active }) => {
    const palette = theme.colors[color];
    return active
      ? palette.main
      : `color-mix(in srgb, ${palette.main} 35%, transparent)`;
  }};
  transition:
    width 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme, color }) => theme.colors[color].main};
  }

  &:disabled {
    cursor: pointer;
    opacity: 0.6;
  }
`;
