import styled from '@emotion/styled';
import { ratingClasses } from './classes';
import { TRatingProps, TRatingSize } from './types';

type TSRatingProps = Pick<TRatingProps, 'color' | 'variant' | 'size'>;

const customProps = new Set(['color', 'variant', 'size']);

const iconSize: Record<TRatingSize, string> = {
  xs: '14px',
  sm: '18px',
  md: '24px',
  lg: '32px',
  xl: '40px',
};

export const SRating = styled('span', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSRatingProps>`
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  color: ${({ theme, variant = 'solid', color = 'warning' }) => {
    const palette = theme.colors[color];

    switch (variant) {
      case 'subtle':
      case 'surface':
        return palette.darker;
      case 'outline':
      case 'ghost':
      case 'plain':
        return palette.main;
      case 'solid':
      default:
        return palette.main;
    }
  }};
  cursor: pointer;
  font-size: ${({ size = 'md' }) => iconSize[size]};
  line-height: 1;

  &.${ratingClasses.disabled} {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  }

  &.${ratingClasses.readOnly} {
    pointer-events: none;
    cursor: default;
  }

  .${ratingClasses.item} {
    position: relative;
    display: inline-flex;
    width: 1em;
    height: 1em;
  }

  .${ratingClasses.icon} {
    display: flex;
    width: 1em;
    height: 1em;

    svg {
      width: 1em;
      height: 1em;
    }
  }

  .${ratingClasses.iconEmpty} {
    color: ${({ theme, variant = 'solid', color = 'warning' }) => {
      const palette = theme.colors[color];

      switch (variant) {
        case 'outline':
        case 'ghost':
        case 'plain':
          return palette.main;
        default:
          return `color-mix(in srgb, ${palette.main} 28%, transparent)`;
      }
    }};
  }

  .${ratingClasses.iconFilled} {
    position: absolute;
    inset-block-start: 0;
    inset-inline-start: 0;
    overflow: hidden;
    width: var(--cui-rating-fill, 0%);
    pointer-events: none;
  }

  .${ratingClasses.label} {
    position: absolute;
    inset-block: 0;
    top: 0;
    overflow: hidden;
    height: 100%;
    cursor: inherit;
    font-size: 0;
  }

  .${ratingClasses.visuallyHidden} {
    position: absolute;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    white-space: nowrap;
  }

  .${ratingClasses.item}:has(.${ratingClasses.visuallyHidden}:focus-visible) {
    outline: 2px solid currentColor;
    outline-offset: 2px;
    border-radius: ${({ theme }) => theme.radius.small};
  }
`;
