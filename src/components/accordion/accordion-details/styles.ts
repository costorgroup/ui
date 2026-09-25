import styled from '@emotion/styled';
import {
  TSAccordionDetailsInnerProps,
  TSAccordionDetailsProps,
} from './types';

const detailsCustomProps = new Set(['expanded']);
const detailsInnerCustomProps = new Set(['size']);

/** Slides open and shut: the row grows from 0fr to 1fr while the clip
 * hides the overflow. */
export const SAccordionDetails = styled('div', {
  shouldForwardProp: (prop) => !detailsCustomProps.has(prop),
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

export const SAccordionDetailsInner = styled('div', {
  shouldForwardProp: (prop) => !detailsInnerCustomProps.has(prop),
})<TSAccordionDetailsInnerProps>`
  padding: ${({ theme, size }) => {
    const { padX } = theme.sizes[size];
    return `calc(${padX} * 0.75) ${padX} ${padX}`;
  }};
`;
