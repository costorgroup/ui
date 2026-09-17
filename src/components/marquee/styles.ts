import styled from '@emotion/styled';
import { TGap } from '../../theme/types';
import { TSMarqueeProps } from './types';

const customProps = new Set(['direction', 'gap', 'align']);

const toGap = (theme: { spacing: (value: number) => string; gap: Record<TGap, number> }, gap?: TSMarqueeProps['gap']) => {
  if (gap === undefined) {
    return undefined;
  }

  if (typeof gap === 'number') {
    return theme.spacing(gap);
  }

  if (gap in theme.gap) {
    return theme.spacing(theme.gap[gap as TGap]);
  }

  return gap;
};

export const SMarquee = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSMarqueeProps>`
  overflow: hidden;
  width: 100%;
  min-width: 0;
  min-height: 0;
  cursor: grab;
  user-select: none;
  touch-action: none;

  &[data-dragging='true'] {
    cursor: grabbing;
  }
`;

export const SMarqueeTrack = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSMarqueeProps>`
  display: flex;
  flex-direction: ${({ direction }) =>
    direction === 'top' || direction === 'bottom' ? 'column' : 'row'};
  align-items: ${({ align }) => align};
  width: max-content;
  height: max-content;
  gap: ${({ theme, gap }) => toGap(theme, gap)};
  will-change: transform;
  backface-visibility: hidden;
`;
