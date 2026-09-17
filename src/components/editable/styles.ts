import styled from '@emotion/styled';

/** Headless: Editable only manages state, so the wrapper stays out of layout
 * and leaves all visual styling to whatever `render` returns. */
export const SEditable = styled.span`
  display: contents;
`;
