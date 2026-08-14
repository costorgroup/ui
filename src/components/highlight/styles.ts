import styled from '@emotion/styled';
import { THighlightOwnProps } from './types';

type TSHighlightProps = Pick<THighlightOwnProps, 'color'>;

const customProps = new Set(['color']);

export const SHighlight = styled('span', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSHighlightProps>`
  font: inherit;
  font-size: inherit;
  font-weight: inherit;
  font-family: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  background-color: ${({ theme, color = 'primary' }) =>
    theme.colors[color].main};
  color: ${({ theme, color = 'primary' }) =>
    theme.colors[color].contrastText};
`;
