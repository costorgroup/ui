import styled from '@emotion/styled';
import { TTextSize } from '../../text/types';

type TSBlockquoteCaptionProps = {
  size?: TTextSize;
};

const customProps = new Set(['size']);

const typographySizeMap: Record<TTextSize, 'small' | 'medium' | 'large'> = {
  xs: 'small',
  sm: 'small',
  md: 'medium',
  lg: 'large',
  xl: 'large',
};

export const SBlockquoteCaption = styled('p', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSBlockquoteCaptionProps>`
  margin: 0;
  font-family: inherit;
  font-size: ${({ theme, size = 'sm' }) =>
    theme.typography.text[typographySizeMap[size]]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  color: inherit;

  &::before {
    content: '—';
    margin-right: ${({ theme }) => theme.spacing(1)};
  }
`;
