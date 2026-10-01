import styled from '@emotion/styled';

// Positioning and inset live on the item's trailing group; a slot only lays
// out its own children. Only real controls take pointer events, so clicking
// a count chip still activates the item underneath.
export const SSidebarItemTrailing = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: var(--sidebar-trailing-gap);

  & :is(a, button, input, select, textarea, label, [role='button'], [tabindex]) {
    pointer-events: auto;
  }
`;
