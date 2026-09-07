import styled from '@emotion/styled';
import { TGap } from '../../../theme/types';
import { TGridOwnProps, TGridTemplate, TGridTrack } from './types';

type TSGridProps = Pick<
  TGridOwnProps,
  | 'columns'
  | 'rows'
  | 'templateColumns'
  | 'templateRows'
  | 'gap'
  | 'alignItems'
  | 'justifyItems'
  | 'minChildWidth'
>;

const customProps = new Set([
  'columns',
  'rows',
  'templateColumns',
  'templateRows',
  'gap',
  'alignItems',
  'justifyItems',
  'minChildWidth',
]);

const toRepeat = (
  track: TGridTrack | undefined,
  fallback: TGridTrack,
) => {
  const value = track ?? fallback;

  if (value === 'auto') {
    return undefined;
  }

  return `repeat(${value}, 1fr)`;
};

const toTemplate = (template: TGridTemplate | undefined) => {
  if (template == null) {
    return undefined;
  }

  if (Array.isArray(template)) {
    return template
      .map((track) => (typeof track === 'number' ? `${track}px` : track))
      .join(' ');
  }

  return template;
};

export const SGrid = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSGridProps>`
  display: grid;
  grid-template-columns: ${({ columns, templateColumns }) =>
    toTemplate(templateColumns) ?? toRepeat(columns, 3)};
  grid-template-rows: ${({ rows, templateRows }) =>
    toTemplate(templateRows) ?? toRepeat(rows, 'auto')};
  align-items: ${({ alignItems }) => alignItems};
  justify-items: ${({ justifyItems }) => justifyItems};
  gap: ${({ theme, gap }) => {
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
  }};

  ${({ theme, minChildWidth }) => {
    if (!minChildWidth) {
      return undefined;
    }

    return `
      ${theme.breakpoints.down(minChildWidth)} {
        grid-template-columns: 1fr;

        & > * {
          grid-column: 1 / -1;
          grid-row: auto;
        }
      }
    `;
  }}
`;
