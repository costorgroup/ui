import styled from '@emotion/styled';
import { TPaletteColor } from '../../theme/types';
import { TSectionAlign } from './section-group/context';

export type TSSectionProps = {
  align: TSectionAlign;
  color: TPaletteColor;
};

const customProps = new Set(['align', 'color']);

export const SSection = styled('section', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSSectionProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  box-sizing: border-box;
  --section-path-color: ${({ theme, color }) => theme.palette[color].main};
  --section-marker-offset: ${({ theme, align }) =>
    align === 'center'
      ? 'calc(var(--section-marker-size, 0.625rem) / 2)'
      : `calc(${theme.typography.heading.h3} * ${theme.typography.lineHeight.heading} / 2)`};

  ${({ align }) =>
    align === 'center'
      ? `
    align-items: center;
    text-align: center;
  `
      : `
    align-items: stretch;
    text-align: ${align === 'right' ? 'right' : 'left'};
  `}
`;

export const SSectionPathMarker = styled.span`
  position: relative;
  z-index: 1;
  display: block;
  flex-shrink: 0;
  width: var(--section-marker-size, 0.625rem);
  height: var(--section-marker-size, 0.625rem);
  border-radius: 50%;
  background-color: var(--section-path-color, currentColor);
  box-sizing: border-box;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    border-radius: 50%;
    background-color: color-mix(
      in srgb,
      var(--section-path-color, currentColor) 50%,
      transparent
    );
    transform: translate(-50%, -50%);
    z-index: -1;
    pointer-events: none;
  }
`;
