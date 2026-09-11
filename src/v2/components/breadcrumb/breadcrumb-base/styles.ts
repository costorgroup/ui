import styled from '@emotion/styled';
import { TSBreadcrumbBaseProps } from './types';

const customProps = new Set(['size', 'color']);

export const SBreadcrumbBase = styled('nav', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSBreadcrumbBaseProps>`
  font-family: inherit;
  font-size: ${({ theme, size }) =>
    `calc(${theme.typography.text[size]} * ${theme.sizeScale[size]})`};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  color: ${({ theme }) => theme.palette.default.main};

  --breadcrumb-accent: ${({ theme, color }) => theme.palette[color].main};
  --breadcrumb-accent-dark: ${({ theme, color }) => theme.palette[color].dark};
  --breadcrumb-muted: ${({ theme }) => theme.palette.default.main};
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
