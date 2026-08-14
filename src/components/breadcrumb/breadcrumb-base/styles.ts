import styled from '@emotion/styled';
import { TBreadcrumbSize, TSBreadcrumbBaseProps } from './types';

const customProps = new Set(['size', 'color']);

const typographySizeMap: Record<TBreadcrumbSize, 'small' | 'medium' | 'large'> =
  {
    xs: 'small',
    sm: 'small',
    md: 'medium',
    lg: 'large',
    xl: 'large',
  };

export const SBreadcrumbBase = styled('nav', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSBreadcrumbBaseProps>`
  font-family: inherit;
  font-size: ${({ theme, size }) =>
    `calc(${theme.typography.text[typographySizeMap[size]]} * ${theme.sizeScale[size]})`};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  color: ${({ theme, color }) => theme.colors[color].main};

  --breadcrumb-accent: ${({ theme, color }) => theme.colors[color].main};
  --breadcrumb-accent-dark: ${({ theme, color }) => theme.colors[color].dark};
  --breadcrumb-muted: ${({ theme }) => theme.colors.default.light};
`;

export const SBreadcrumbList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  margin: 0;
  padding: 0;
  list-style: none;
`;
