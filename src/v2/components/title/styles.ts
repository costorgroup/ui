import styled from '@emotion/styled';
import { TTitleAs, TTitleOwnProps } from './types';

type TSTitleProps = {
  level: TTitleAs;
  color?: TTitleOwnProps['color'];
};

const customProps = new Set(['level', 'color']);

export const STitle = styled('h1', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSTitleProps>`
  margin: 0;
  font-family: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeight.heading};
  color: ${({ theme, color = 'default' }) => theme.colors[color].main};
  font-size: ${({ theme, level }) => theme.typography.heading[level]};
`;
