import styled from '@emotion/styled';
import { TSBlockquoteIconProps } from './types';

const customProps = new Set(['color']);

export const SBlockquoteIcon = styled('span', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSBlockquoteIconProps>`
  display: inline-flex;
  flex-shrink: 0;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  margin-top: 0.1em;
  line-height: 0;
  color: ${({ theme, color }) => theme.palette[color].main};

  & > svg {
    display: block;
  }
`;
