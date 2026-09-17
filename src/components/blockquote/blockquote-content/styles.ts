import styled from '@emotion/styled';
import { TTextSize } from '../../text/types';

type TSBlockquoteContentProps = {
  size?: TTextSize;
};

const customProps = new Set(['size', 'as']);

export const SBlockquoteContent = styled('p', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSBlockquoteContentProps>`
  margin: 0;
  font-family: inherit;
  font-size: ${({ theme, size = 'md' }) => theme.typography.text[size]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  color: ${({ theme }) => theme.palette.default.main};
`;
