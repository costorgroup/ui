import styled from '@emotion/styled';
import { TSmallOwnProps } from './types';

type TSSmallProps = Pick<TSmallOwnProps, 'color'>;

const customProps = new Set(['color']);

export const SSmall = styled('small', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSSmallProps>`
  margin: 0;
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  font-weight: ${({ theme }) => theme.typography.small.fontWeight};
  font-style: ${({ theme }) => theme.typography.small.fontStyle};
  line-height: ${({ theme }) => theme.typography.small.lineHeight};
  color: ${({ theme, color = 'default' }) => theme.palette[color].main};
`;
