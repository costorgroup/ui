import styled from '@emotion/styled';
import { PALETTE_TINT } from '../../helpers/variant-styles';
import { colorMixBase } from '../../helpers/variant-styles/surface';
import { TSBadgeProps } from './types';

const customProps = new Set([
  'color',
  'variant',
  'size',
  'isDot',
  'invisible',
  'overlap',
  'vertical',
  'horizontal',
]);

const overlapOffset: Record<
  TSBadgeProps['overlap'],
  Record<'vertical' | 'horizontal', string>
> = {
  rectangular: {
    vertical: '0',
    horizontal: '0',
  },
  circular: {
    vertical: '14%',
    horizontal: '14%',
  },
};

export const SBadge = styled('span', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSBadgeProps>`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  flex-shrink: 0;
`;

export const SBadgeContent = styled('span', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSBadgeProps>`
  position: absolute;
  box-sizing: border-box;
  display: ${({ invisible }) => (invisible ? 'none' : 'inline-flex')};
  align-items: center;
  justify-content: center;
  z-index: 1;
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-family: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1;
  white-space: nowrap;
  pointer-events: none;
  transform: scale(1);
  transform-origin: center;
  box-shadow: 0 0 0 2px ${({ theme }) => theme.surfaces.background};

  ${({ theme, isDot, size }) => {
    const step = theme.sizes[size];

    if (isDot) {
      const dot = `calc(${step.icon} * 0.4)`;

      return `
        width: ${dot};
        height: ${dot};
        min-width: ${dot};
        padding: 0;
        font-size: 0;
      `;
    }

    return `
      font-size: calc(${step.fontSize} * 0.75);
      line-height: 1;
      padding: 0 0.35em;
      min-width: calc(1em + 0.35em * 2 + 2px);
      height: calc(1em + 0.35em * 2 + 2px);
    `;
  }}

  ${({ vertical, horizontal, overlap }) => {
    const offset = overlapOffset[overlap];

    const top =
      vertical === 'top'
        ? `top: ${offset.vertical};`
        : `bottom: ${offset.vertical};`;
    const left =
      horizontal === 'left'
        ? `left: ${offset.horizontal};`
        : `right: ${offset.horizontal};`;
    const translateX = horizontal === 'left' ? '-50%' : '50%';
    const translateY = vertical === 'top' ? '-50%' : '50%';

    return `
      ${top}
      ${left}
      transform: translate(${translateX}, ${translateY});
    `;
  }}

  ${({ theme, variant, color }) => {
    const palette = theme.palette[color];
    const tint = colorMixBase(
      palette.main,
      PALETTE_TINT,
      theme.surfaces.background,
    );

    if (variant === 'subtle') {
      return `
        background-color: ${tint};
        color: ${palette.main};
        border-color: transparent;
      `;
    }

    if (variant === 'surface') {
      return `
        background-color: ${tint};
        color: ${palette.main};
        border-color: ${palette.main};
      `;
    }

    return `
      background-color: ${palette.main};
      color: ${palette.contrastText};
      border-color: transparent;
    `;
  }}
`;
