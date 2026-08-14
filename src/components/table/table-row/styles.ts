import styled from '@emotion/styled';

export const STableRow = styled.tr`
  transition: background-color 0.15s ease;

  tbody &:hover {
    background-color: var(--table-row-hover, transparent);
  }
`;
