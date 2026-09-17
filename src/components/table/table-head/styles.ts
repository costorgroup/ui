import styled from '@emotion/styled';

export const STableHead = styled.thead`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: var(--table-head-bg, transparent);
  color: inherit;

  tr:hover {
    background-color: transparent;
  }

  th {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: inherit;
    white-space: nowrap;
    /* border-collapse ignores borders on a sticky-positioned thead in most
       browsers, so the head/body divider is drawn with a box-shadow instead. */
    box-shadow: inset 0 -1px 0 0 var(--table-border, transparent);
  }
`;
