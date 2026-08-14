import styled from '@emotion/styled';
import {
  TSAccordionExpandIconProps,
  TSAccordionSummaryProps,
} from './types';

const customSummaryProps = new Set(['expandIconPosition', 'expanded', 'variant']);
const customIconProps = new Set(['expanded', 'variant']);

export const SAccordionSummary = styled('button', {
  shouldForwardProp: (prop) => !customSummaryProps.has(prop),
})<TSAccordionSummaryProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: ${({ expandIconPosition }) =>
    expandIconPosition === 'left' ? 'row-reverse' : 'row'};
  gap: var(--accordion-gap);
  width: 100%;
  margin: 0;
  padding: var(--accordion-pad-y) var(--accordion-pad-x);
  border: 0;
  border-radius: inherit;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: ${({ variant }) =>
      variant === 'solid' || variant === 'plain'
        ? 'transparent'
        : 'color-mix(in srgb, currentColor 6%, transparent)'};
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: -2px;
  }
`;

export const SAccordionSummaryContent = styled.span`
  flex: 1;
  min-width: 0;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const SAccordionExpandIcon = styled('span', {
  shouldForwardProp: (prop) => !customIconProps.has(prop),
})<TSAccordionExpandIconProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  opacity: ${({ variant }) => (variant === 'solid' ? 0.9 : 0.7)};
  transform: ${({ expanded }) => (expanded ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
`;
