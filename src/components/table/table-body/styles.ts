import styled from '@emotion/styled';

export const STableBody = styled.tbody`
  tr {
    border-bottom: 1px solid var(--table-border, transparent);

    &:last-child {
      border-bottom: none;
    }
  }
`;
