import styled from '@emotion/styled';
import { typographyChromeStyles } from '../../helpers/variant-styles/typography-chrome';
import { TCodeOwnProps } from './types';

type TSCodeProps = Pick<TCodeOwnProps, 'variant' | 'size' | 'color'>;

const customProps = new Set(['variant', 'size', 'color', 'as']);

export const SCode = styled('code', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSCodeProps>`
  display: inline;
  box-sizing: border-box;
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radius.small};
  padding: 0.1em 0.35em;
  font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas,
    'Liberation Mono', monospace;
  font-size: ${({ theme, size = 'sm' }) => theme.typography.text[size]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  white-space: break-spaces;
  vertical-align: baseline;

  ${({ theme, variant = 'subtle', color = 'default' }) =>
    typographyChromeStyles(variant, theme.palette[color], theme)}
`;
