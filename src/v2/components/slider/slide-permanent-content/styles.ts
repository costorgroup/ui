import styled from '@emotion/styled';

export const SSlidePermanentContent = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;

  & :is(
    a,
    button,
    input,
    textarea,
    select,
    label,
    summary,
    [role='button'],
    [tabindex]:not([tabindex='-1']),
    [data-slide-permanent-interactive],
    [data-slider-content-interactive]
  ) {
    pointer-events: auto;
  }
`;
