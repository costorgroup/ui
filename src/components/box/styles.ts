import styled from '@emotion/styled';
import { TBoxOwnProps } from './types';

type TSBoxProps = Pick<TBoxOwnProps, 'fullWidth'>;

const customProps = new Set(['as', 'fullWidth']);

export const SBox = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSBoxProps>`
  box-sizing: border-box;
  ${({ fullWidth }) => (fullWidth ? 'width: 100%;' : '')}
`;
