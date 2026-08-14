import styled from '@emotion/styled';
import { TSTableCellProps } from './types';

const customProps = new Set(['align']);

export const STableCell = styled('td', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSTableCellProps>`
  box-sizing: border-box;
  padding: var(--table-pad-y, 0.5rem) var(--table-pad-x, 0.75rem);
  vertical-align: middle;
  text-align: ${({ align }) => align};
  font: inherit;
  color: inherit;
`;
