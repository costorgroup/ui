import styled from '@emotion/styled';
import { TGap } from '../../../theme/types';
import { sectionClasses } from '../classes';
import { sectionTitleClasses } from '../section-title/classes';
import { TSSectionGroupProps } from './types';

const customProps = new Set(['align', 'color', 'variant', 'gap']);

const resolveGap = (
  theme: {
    spacing: (...args: number[]) => string;
    gap: Record<string, number>;
  },
  gap: TSSectionGroupProps['gap'],
) => {
  if (typeof gap === 'number') {
    return theme.spacing(gap);
  }

  if (gap in theme.gap) {
    return theme.spacing(theme.gap[gap as TGap]);
  }

  return gap;
};

export const SSectionGroup = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSSectionGroupProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  --section-marker-size: 0.625rem;
  --section-line-width: 2px;
  --section-rail-gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  --section-path-color: ${({ theme, color }) => theme.palette[color].main};
  --section-path-line: ${({ theme, color }) =>
    `color-mix(in oklab, ${theme.palette[color].main} 40%, transparent)`};
  --section-path-gap: ${({ theme, gap }) => resolveGap(theme, gap)};
  gap: ${({ theme, gap }) => resolveGap(theme, gap)};

  & > .${sectionClasses.root} {
    position: relative;
  }

  ${({ variant }) =>
    variant === 'none'
      ? `
    & > .${sectionClasses.root}::after {
      content: none !important;
      display: none !important;
    }

    & .${sectionTitleClasses.marker} {
      display: none;
    }
  `
      : `
    & > .${sectionClasses.root}:not(:last-child)::after {
      content: '';
      position: absolute;
      width: var(--section-line-width);
      background-color: var(--section-path-line);
      pointer-events: none;
      z-index: 0;
    }

    & > .${sectionClasses.root}:last-child::after {
      content: none;
      display: none;
    }
  `}

  ${({ align, variant }) => {
    if (variant === 'none') {
      return '';
    }

    if (align === 'center') {
      if (variant === 'line') {
        return `
          & > .${sectionClasses.root}:not(:last-child)::after {
            left: 50%;
            transform: translateX(-50%);
            top: 100%;
            height: var(--section-path-gap);
          }
        `;
      }

      return `
        & > .${sectionClasses.root}:not(:last-child)::after {
          left: 50%;
          transform: translateX(-50%);
          top: calc(100% - var(--section-marker-size) / 2);
          height: calc(var(--section-path-gap) + var(--section-marker-size));
        }
      `;
    }

    // left / right — same geometry for dot, halo, and line
    if (align === 'right') {
      return `
        & > .${sectionClasses.root}:not(:last-child)::after {
          right: calc(var(--section-marker-size) / 2 - var(--section-line-width) / 2);
          left: auto;
          top: var(--section-marker-offset);
          bottom: calc(
            -1 * (var(--section-path-gap) + var(--section-marker-offset))
          );
        }
      `;
    }

    return `
      & > .${sectionClasses.root}:not(:last-child)::after {
        left: calc(var(--section-marker-size) / 2 - var(--section-line-width) / 2);
        top: var(--section-marker-offset);
        bottom: calc(
          -1 * (var(--section-path-gap) + var(--section-marker-offset))
        );
      }
    `;
  }}

  & .${sectionTitleClasses.marker} {
    z-index: 1;
  }

  ${({ variant }) =>
    variant === 'dot'
      ? `
    & .${sectionTitleClasses.marker}::before {
      content: none;
      display: none;
    }
  `
      : variant === 'line'
        ? `
    & .${sectionTitleClasses.marker} {
      display: none;
    }
  `
        : ''}
`;
