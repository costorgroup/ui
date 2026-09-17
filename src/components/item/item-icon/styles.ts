import styled from '@emotion/styled';
import { CHROME_FILL } from '../../../helpers/variant-styles';
import { colorMixBase } from '../../../helpers/variant-styles/surface';

export const SItemIcon = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  flex-shrink: 0;
  overflow: hidden;
  width: var(--item-icon-size, ${({ theme }) => theme.sizes.md.height});
  height: var(--item-icon-size, ${({ theme }) => theme.sizes.md.height});
  border-radius: ${({ theme }) => theme.radius.sm};
  background-color: ${({ theme }) =>
    colorMixBase(theme.surfaces.mixer, CHROME_FILL, theme.surfaces.background)};
  color: ${({ theme }) => theme.surfaces.ink};

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    display: block;
    width: var(--item-icon-glyph, ${({ theme }) => theme.sizes.md.icon});
    height: var(--item-icon-glyph, ${({ theme }) => theme.sizes.md.icon});
  }
`;
