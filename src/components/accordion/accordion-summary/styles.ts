import styled from '@emotion/styled';
import {
  accordionSummaryDivider,
  accordionSummaryVariantStyles,
} from '../variant-styles';
import { accordionSummaryClasses } from './classes';
import {
  TSAccordionExpandIconProps,
  TSAccordionSummaryProps,
} from './types';

const summaryCustomProps = new Set([
  'paletteColor',
  'variant',
  'expanded',
  'disabled',
  'expandIconPosition',
  'size',
  'hasDetails',
  'forceContrastText',
  'colorScope',
  'radius',
]);

export const SAccordionSummary = styled('button', {
  shouldForwardProp: (prop) => !summaryCustomProps.has(prop),
})<TSAccordionSummaryProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme, size }) =>
    `calc(${theme.spacing(theme.gap.sm)} * ${theme.sizeScale[size]})`};
  width: 100%;
  margin: 0;
  padding: ${({ theme, size, variant }) => {
    if (variant === 'plain') {
      return 0;
    }

    const scale = theme.sizeScale[size];
    return `calc(${theme.spacing(theme.gap.sm)} * ${scale}) calc(${theme.spacing(theme.gap.md)} * ${scale})`;
  }};
  margin-bottom: ${({ theme, variant, colorScope, expanded, hasDetails, size }) =>
    (variant === 'plain' || colorScope === 'summary') && expanded && hasDetails
      ? `calc(${theme.spacing(theme.gap.sm)} * ${theme.sizeScale[size]})`
      : 0};
  border: none;
  border-bottom: ${({ theme, variant, expanded, hasDetails }) =>
    variant === 'plain'
      ? 'none'
      : expanded && hasDetails
        ? accordionSummaryDivider(variant, theme)
        : '1px solid transparent'};
  background: transparent;
  font: inherit;
  text-align: left;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition:
    background-color 0.12s ease,
    border-color 0.12s ease,
    color 0.12s ease;
  flex-direction: ${({ expandIconPosition }) =>
    expandIconPosition === 'left' ? 'row-reverse' : 'row'};
  justify-content: space-between;

  ${({ theme, paletteColor, variant, colorScope, radius, forceContrastText }) =>
    accordionSummaryVariantStyles(variant, theme.palette[paletteColor], theme, {
      colorScope,
      radius,
      forceContrastText,
    })}

  &:focus-visible {
    outline: 2px solid
      ${({ theme, paletteColor }) => theme.palette[paletteColor].main};
    outline-offset: -2px;
  }
`;

export const SAccordionSummaryContent = styled.span`
  flex: 1;
  min-width: 0;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const SAccordionExpandIcon = styled.span<TSAccordionExpandIconProps>`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, color 0.12s ease;
  transform: ${({ expanded }) => (expanded ? 'rotate(180deg)' : 'rotate(0deg)')};
`;
