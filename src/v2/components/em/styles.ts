import styled from '@emotion/styled';
import { TEmOwnProps } from './types';

type TSEmProps = Pick<TEmOwnProps, 'color'>;

const customProps = new Set(['color']);

export const SEm = styled('em', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSEmProps>`
  font: inherit;
  font-style: italic;
  color: ${({ theme, color }) =>
    color != null ? theme.palette[color].main : 'inherit'};
`;
