import styled from '@emotion/styled';

export const SCardHeader = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  align-items: start;
  gap: ${({ theme }) => theme.spacing(theme.gap.xs)};
  padding-inline: var(--card-spacing);
  min-width: 0;

  &:has([data-slot='card-action']) {
    grid-template-columns: 1fr auto;
  }
`;
