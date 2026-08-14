import styled from '@emotion/styled';
import { TAvatarGroupSpacing, TSAvatarGroupProps } from '../avatar/context';
import { TAvatarSize } from '../avatar/types';

const customProps = new Set(['spacing', 'size']);

const spacingMap: Record<'small' | 'medium', string> = {
  small: '-0.5rem',
  medium: '-0.75rem',
};

const sizeRing: Record<TAvatarSize, string> = {
  xs: '1px',
  sm: '1.5px',
  md: '2px',
  lg: '2.5px',
  xl: '3px',
};

const resolveSpacing = (spacing: TAvatarGroupSpacing) => {
  if (typeof spacing === 'number') {
    return `${-spacing}px`;
  }

  return spacingMap[spacing];
};

export const SAvatarGroup = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSAvatarGroupProps>`
  display: inline-flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-end;

  > * {
    margin-left: ${({ spacing }) => resolveSpacing(spacing)};
    box-shadow: ${({ theme, size }) =>
      `0 0 0 ${sizeRing[size]} ${theme.colors.common.white}`};
  }

  > *:last-child {
    margin-left: 0;
  }
`;
