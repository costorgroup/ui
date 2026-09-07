import styled from '@emotion/styled';
import {
  TSAccordionDetailsInnerProps,
  TSAccordionDetailsProps,
} from './types';

const detailsCustomProps = new Set(['expanded']);
const detailsInnerCustomProps = new Set(['size', 'variant', 'color']);

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
    const scale = theme.sizeScale[size];
    return `calc(${theme.spacing(theme.gap.sm)} * ${scale}) calc(${theme.spacing(theme.gap.md)} * ${scale})`;
  }};
  background-color: transparent;
  color: inherit;
`;
