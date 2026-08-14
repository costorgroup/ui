import styled from '@emotion/styled';
import { TSAccordionDetailsProps } from './types';

const customProps = new Set(['expanded']);

export const SAccordionDetails = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSAccordionDetailsProps>`
  display: grid;
  grid-template-rows: ${({ expanded }) => (expanded ? '1fr' : '0fr')};
  overflow: hidden;
  visibility: ${({ expanded }) => (expanded ? 'visible' : 'hidden')};
  pointer-events: ${({ expanded }) => (expanded ? 'auto' : 'none')};
  transition:
    grid-template-rows 0.2s ease,
    visibility 0.2s ease;
`;

export const SAccordionDetailsClip = styled.div`
  min-height: 0;
  overflow: hidden;
`;

export const SAccordionDetailsInner = styled.div`
  padding: 0 var(--accordion-pad-x) var(--accordion-pad-y);
  color: inherit;
  opacity: 0.92;
`;
