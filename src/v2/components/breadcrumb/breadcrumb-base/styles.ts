import styled from '@emotion/styled';
import { TSBreadcrumbBaseProps } from './types';

const customProps = new Set(['size', 'color']);

export const SBreadcrumbBase = styled('nav', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSBreadcrumbBaseProps>`
  font-family: inherit;
  font-size: ${({ theme, size }) => theme.sizes[size].fontSize};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  color: ${({ theme }) => theme.surfaces.ink};

  --breadcrumb-accent: ${({ theme, color }) =>
    color === 'default'
      ? theme.surfaces.ink
      : theme.palette[color].main};
  --breadcrumb-accent-dark: ${({ theme, color }) =>
    color === 'default'
      ? theme.surfaces.ink
      : theme.palette[color].dark};
  --breadcrumb-muted: ${({ theme }) => theme.surfaces.muted};
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
