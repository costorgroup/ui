import styled from '@emotion/styled';
import { TBadgeSize, TSBadgeProps } from './types';

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

const contentMinSize: Record<TBadgeSize, string> = {
  xs: '0.875rem',
  sm: '1rem',
  md: '1.25rem',
  lg: '1.5rem',
  xl: '1.75rem',
};

const contentFont: Record<TBadgeSize, string> = {
  xs: '9px',
  sm: '10px',
  md: '11px',
  lg: '12px',
  xl: '13px',
};

const contentPadX: Record<TBadgeSize, string> = {
  xs: '0.25rem',
  sm: '0.3rem',
  md: '0.375rem',
  lg: '0.45rem',
  xl: '0.5rem',
};

const dotSize: Record<TBadgeSize, string> = {
  xs: '0.3125rem',
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.625rem',
  xl: '0.75rem',
};

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
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  pointer-events: none;
  transform: scale(1);
  transform-origin: center;

  ${({ isDot, size }) =>
    isDot
      ? `
        width: ${dotSize[size]};
        height: ${dotSize[size]};
        min-width: ${dotSize[size]};
        padding: 0;
        font-size: 0;
      `
      : `
        min-width: ${contentMinSize[size]};
        height: ${contentMinSize[size]};
        padding: 0 ${contentPadX[size]};
        font-size: ${contentFont[size]};
      `}

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
    const palette = theme.colors[color];

    switch (variant) {
      case 'subtle':
        return `
          background-color: color-mix(in srgb, ${palette.main} 12%, transparent);
          color: ${palette.darker};
          border-color: transparent;
        `;
      case 'surface':
        return `
          background-color: color-mix(in srgb, ${palette.lighter} 88%, transparent);
          color: ${palette.darker};
          border-color: color-mix(in srgb, ${palette.main} 24%, transparent);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        `;
      case 'outline':
        return `
          background-color: ${theme.colors.common.white};
          color: ${palette.main};
          border-color: ${palette.main};
        `;
      case 'ghost':
        return `
          background-color: color-mix(in srgb, ${palette.main} 8%, transparent);
          color: ${palette.main};
          border-color: transparent;
        `;
      case 'plain':
        return `
          background-color: transparent;
          color: ${palette.main};
          border-color: transparent;
        `;
      case 'solid':
      default:
        return `
          background-color: ${palette.main};
          color: ${palette.contrastText};
          border-color: ${palette.main};
        `;
    }
  }}
`;
