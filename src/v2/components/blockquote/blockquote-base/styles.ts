import styled from '@emotion/styled';
import { TSBlockquoteBaseProps } from './types';

const customProps = new Set(['color']);

export const SBlockquoteBase = styled('blockquote', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSBlockquoteBaseProps>`
  margin: 0;
  padding-left: ${({ theme }) => theme.spacing(4)};
  border-left: 4px solid
    ${({ theme, color }) => theme.colors[color].main};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;
