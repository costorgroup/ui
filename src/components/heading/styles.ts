import styled from '@emotion/styled';
import { THeadingAs, THeadingOwnProps } from './types';

type TSHeadingProps = {
  level: THeadingAs;
  color?: THeadingOwnProps['color'];
};

const customProps = new Set(['level', 'color', 'as']);

export const SHeading = styled('h1', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSHeadingProps>`
  margin: 0;
  font-family: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeight.heading};
  color: ${({ theme, color = 'default' }) => theme.palette[color].main};
  font-size: ${({ theme, level }) => theme.typography.heading[level]};
`;
