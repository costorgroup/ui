import styled from '@emotion/styled';
import { TGap } from '../../theme/types';
import { TGridOwnProps, TGridTrack } from './types';

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

const toTemplate = (track: TGridTrack | undefined, fallback: TGridTrack) => {
  const value = track ?? fallback;

  if (value === 'auto') {
    return undefined;
  }

  return `repeat(${value}, 1fr)`;
};

export const SGrid = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSGridProps>`
  display: grid;
  grid-template-columns: ${({ columns, templateColumns }) =>
    templateColumns ?? toTemplate(columns, 3)};
  grid-template-rows: ${({ rows, templateRows }) =>
    templateRows ?? toTemplate(rows, 'auto')};
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
