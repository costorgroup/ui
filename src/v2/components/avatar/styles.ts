import styled from '@emotion/styled';
import { CHROME_FILL } from '../../idle-variant-styles';
import { colorMixBase } from '../../surface';
import { TSAvatarProps } from './types';

const customProps = new Set(['size', 'radius']);

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
  border-radius: ${({ theme, radius }) => theme.radius[radius]};
  background-color: ${({ theme }) =>
    colorMixBase(theme.surfaces.mixer, CHROME_FILL, theme.surfaces.background)};
  color: ${({ theme }) => theme.surfaces.ink};
  font-family: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1;
  user-select: none;

  ${({ theme, size }) => {
    const step = theme.sizes[size];

    return `
      width: ${step.height};
      height: ${step.height};
      font-size: ${step.fontSize};
    `;
  }}

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
