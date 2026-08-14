import styled from '@emotion/styled';

export const SBreadcrumbItem = styled.li`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(theme.gap.xs)};
  color: var(--breadcrumb-muted);
  transition: color 0.15s ease;

  &:not(:has(~ li:not([data-separator]))) {
    color: var(--breadcrumb-accent);
  }

  &:has([data-ellipsis]) {
    pointer-events: none;
  }

  &:has(~ li:not([data-separator])):not(:has([data-ellipsis])):hover,
  &:has(~ li:not([data-separator])):not(:has([data-ellipsis])):focus-within {
    color: var(--breadcrumb-accent);
  }

  &:not(:has([data-ellipsis])):active {
    color: var(--breadcrumb-accent-dark);
  }
`;
