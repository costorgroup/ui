import styled from '@emotion/styled';
import { TAvatarSize, TSAvatarProps } from './types';

const customProps = new Set(['size', 'radius']);

const sizeMap: Record<TAvatarSize, string> = {
  xs: '1.25rem',
  sm: '2rem',
  md: '2.5rem',
  lg: '3rem',
  xl: '3.5rem',
};

const fontMap: Record<TAvatarSize, string> = {
  xs: '0.625rem',
  sm: '0.75rem',
  md: '0.875rem',
  lg: '1rem',
  xl: '1.125rem',
};

export const SAvatar = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSAvatarProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
  flex-shrink: 0;
  width: ${({ size }) => sizeMap[size]};
  height: ${({ size }) => sizeMap[size]};
  border-radius: ${({ theme, radius }) => theme.radius[radius]};
  background-color: ${({ theme }) => theme.colors.common.grey[10]};
  color: ${({ theme }) => theme.colors.common.grey[16]};
  font-family: inherit;
  font-size: ${({ size }) => fontMap[size]};
  font-weight: 600;
  line-height: 1;
  user-select: none;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
