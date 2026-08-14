import styled from '@emotion/styled';

export const STableHead = styled.thead`
  background-color: var(--table-head-bg, transparent);
  color: var(--table-head-fg, var(--table-fg, inherit));

  tr {
    &:hover {
      background-color: transparent;
    }
  }

  th {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: inherit;
    border-bottom: 1px solid var(--table-border, transparent);
  }
`;
