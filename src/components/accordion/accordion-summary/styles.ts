import styled from '@emotion/styled';
import { accordionSummaryVariantStyles } from '../variant-styles';
import { accordionSummaryClasses } from './classes';
import {
  TSAccordionExpandIconProps,
  TSAccordionSummaryButtonProps,
  TSAccordionSummaryProps,
} from './types';

const summaryCustomProps = new Set([
  'paletteColor',
  'variant',
  'expanded',
  'size',
  'forceContrastText',
  'appearance',
  'colorScope',
  'hasTrailing',
  'actionsVisibility',
]);

const buttonCustomProps = new Set(['paletteColor', 'size']);

const hoverRevealedActions = `
  .${accordionSummaryClasses.actions} {
    opacity: 0;
    transition: opacity 0.15s ease;
  }

  &:hover .${accordionSummaryClasses.actions},
  &:focus-within .${accordionSummaryClasses.actions} {
    opacity: 1;
  }

  @media (hover: none) {
    .${accordionSummaryClasses.actions} {
      opacity: 1;
    }
  }
`;

/** Toggle, then the actions and the grip on the right. */
export const SAccordionSummary = styled('div', {
  shouldForwardProp: (prop) => !summaryCustomProps.has(prop),
})<TSAccordionSummaryProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  box-sizing: border-box;
  min-height: ${({ theme, size }) => `calc(48px * ${theme.sizeScale[size]})`};
  padding-right: ${({ theme, size, hasTrailing }) =>
    hasTrailing ? `calc(${theme.sizes[size].padX} * 0.75)` : 0};
  background-color: transparent;
  color: inherit;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    outline-color 0.2s ease;

  ${({
    theme,
    paletteColor,
    variant,
    expanded,
    colorScope,
    forceContrastText,
    appearance,
  }) =>
    accordionSummaryVariantStyles(variant, theme.palette[paletteColor], theme, {
      expanded,
      colorScope,
      forceContrastText,
      appearance,
    })}

  ${({ actionsVisibility }) =>
    actionsVisibility === 'hover' ? hoverRevealedActions : ''}
`;

/** The clickable summary; opens or closes the accordion. */
export const SAccordionSummaryButton = styled('button', {
  shouldForwardProp: (prop) => !buttonCustomProps.has(prop),
})<TSAccordionSummaryButtonProps>`
  display: flex;
  flex: 1;
  align-items: center;
  align-self: stretch;
  gap: ${({ theme, size }) =>
    `calc(${theme.spacing(theme.gap.sm)} * ${theme.sizeScale[size]})`};
  min-width: 0;
  margin: 0;
  padding: ${({ theme, size }) => {
    const { padX } = theme.sizes[size];
    const padY = `calc(${theme.spacing(2)} * ${theme.sizeScale[size]})`;
    return `${padY} calc(${padX} * 0.75) ${padY} ${padX}`;
  }};
  border: none;
  background: none;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }

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
  overflow-wrap: anywhere;
`;

export const SAccordionExpandIcon = styled.span<TSAccordionExpandIconProps>`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  transform: ${({ expanded }) => (expanded ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export const SAccordionSummaryActions = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.5)};
`;

/** Six-dot grip drawn with a repeating dot gradient. */
export const SAccordionDragHandle = styled.span`
  flex-shrink: 0;
  width: 10px;
  height: 16px;
  margin-left: 6px;
  opacity: 0.6;
  cursor: grab;
  touch-action: none;
  background-image: radial-gradient(
    circle,
    currentColor 1.3px,
    transparent 1.6px
  );
  background-size: 5px 5.33px;

  &:hover {
    opacity: 1;
  }

  &:active {
    cursor: grabbing;
  }
`;
