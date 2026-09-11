import styled from '@emotion/styled';
import { TAvatarGroupSpacing, TSAvatarGroupProps } from '../avatar/context';

const customProps = new Set(['spacing', 'size']);

const overlap: Record<Exclude<TAvatarGroupSpacing, number>, number> = {
  sm: 0.28,
  md: 0.38,
};

const resolveSpacing = (
  spacing: TAvatarGroupSpacing,
  height: string,
) => {
  if (typeof spacing === 'number') {
    return `${-spacing}px`;
  }

  return `calc(${height} * -${overlap[spacing]})`;
};

export const SAvatarGroup = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSAvatarGroupProps>`
  display: inline-flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-end;

  > * {
    margin-left: ${({ theme, spacing, size }) =>
      resolveSpacing(spacing, theme.sizes[size].height)};
    box-shadow: ${({ theme }) => `0 0 0 2px ${theme.surfaces.background}`};
  }

  > *:last-of-type {
    margin-left: 0;
  }
`;
