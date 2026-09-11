import styled from '@emotion/styled';
import { TInputHelperTextProps } from './types';

type TSInputHelperTextProps = Pick<TInputHelperTextProps, 'size'> & {
  error?: boolean;
};

const customProps = new Set(['color', 'size', 'error']);

export const SInputHelperText = styled('p', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSInputHelperTextProps>`
  margin: 0;
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  color: ${({ theme, error }) =>
    error ? theme.palette.error.main : theme.surfaces.muted};
  user-select: none;
`;
