import styled from '@emotion/styled';
import { accordionSummaryIconColors } from '../variant-styles';
import { TAccordionSize } from '../accordion-base/context';
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
]);

const sizeFont: Record<TAccordionSize, string> = {
  xs: '12px',
  sm: '13px',
  md: '14px',
  lg: '16px',
  xl: '18px',
};

export const SAccordionSummary = styled('button', {
  shouldForwardProp: (prop) => !summaryCustomProps.has(prop),
})<TSAccordionSummaryProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme, size }) =>
    `calc(${theme.spacing(theme.gap.sm)} * ${theme.sizeScale[size]})`};
  width: 100%;
  margin: 0;
  padding: ${({ theme, size }) => {
    const scale = theme.sizeScale[size];
    return `calc(${theme.spacing(theme.gap.sm)} * ${scale}) calc(${theme.spacing(theme.gap.md)} * ${scale})`;
  }};
  border: none;
  background: transparent;
  font: inherit;
  color: ${({ theme, variant, paletteColor }) =>
    variant === 'solid'
      ? theme.palette[paletteColor].contrastText
      : theme.palette.default.main};
  text-align: left;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition:
    background-color 0.12s ease,
    border-color 0.12s ease,
    color 0.12s ease;
  flex-direction: ${({ expandIconPosition }) =>
    expandIconPosition === 'left' ? 'row-reverse' : 'row'};
  justify-content: space-between;

  ${({ theme, paletteColor, variant, expanded, hasDetails }) => {
    const palette = theme.palette[paletteColor];
    const icon = accordionSummaryIconColors(
      variant,
      palette,
      expanded && hasDetails,
    );

    return `
      & .${accordionSummaryClasses.expandIcon} {
        color: ${icon.idle};
      }

      &:hover:not(:disabled) .${accordionSummaryClasses.expandIcon} {
        color: ${icon.hover};
      }

      &:active:not(:disabled) .${accordionSummaryClasses.expandIcon},
      &:focus-visible .${accordionSummaryClasses.expandIcon} {
        color: ${icon.focus};
      }
    `;
  }}

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
