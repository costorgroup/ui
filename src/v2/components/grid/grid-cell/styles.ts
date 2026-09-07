import styled from '@emotion/styled';
import { TGridCellOwnProps } from './types';

type TSGridCellProps = Pick<
  TGridCellOwnProps,
  'colSpan' | 'rowSpan' | 'alignSelf' | 'justifySelf'
>;

const customProps = new Set(['colSpan', 'rowSpan', 'alignSelf', 'justifySelf']);

export const SGridCell = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSGridCellProps>`
  grid-column: ${({ colSpan = 1 }) => `span ${colSpan}`};
  grid-row: ${({ rowSpan = 1 }) => `span ${rowSpan}`};
  align-self: ${({ alignSelf }) => alignSelf};
  justify-self: ${({ justifySelf }) => justifySelf};
  min-width: 0;
`;
