import styled from '@emotion/styled';
import { TSTableCellProps } from './types';

// 'as' must be excluded too: a custom shouldForwardProp otherwise makes
// emotion treat `as` as a regular DOM attribute instead of a tag override,
// which silently breaks the td/th switch.
const customProps = new Set(['align', 'as']);

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
