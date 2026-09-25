import styled from '@emotion/styled';
import type { Theme } from '@emotion/react';
import { DragItem } from '../../drag';
import { accordionDivider, accordionShellVariantStyles } from '../variant-styles';
import { TSAccordionBaseProps } from './types';

const rootCustomProps = new Set([
  'radius',
  'size',
  'expanded',
  'disabled',
  'color',
  'variant',
  'grouped',
  'colorScope',
  'forceContrastText',
  'appearance',
]);

const shouldForwardProp = (prop: string) => !rootCustomProps.has(prop);

const shellStyles = ({
  theme,
  radius,
  size,
  expanded,
  disabled,
  color,
  variant,
  grouped,
  colorScope,
  forceContrastText,
  appearance,
}: TSAccordionBaseProps & { theme: Theme }) => `
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  ${
    grouped
      ? ''
      : `
        border: ${accordionDivider(theme)};
        border-radius: ${theme.radius[radius]};
      `
  }
  color: ${theme.surfaces.ink};
  font-family: inherit;
  font-size: ${theme.sizes[size].fontSize};
  font-weight: ${theme.typography.fontWeight.regular};
  line-height: ${theme.typography.lineHeight.text};
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    outline-color 0.2s ease;
  ${accordionShellVariantStyles(variant, theme.palette[color], theme, {
    expanded,
    colorScope,
    forceContrastText,
    appearance,
  })}
  opacity: ${disabled ? 0.55 : 1};
  pointer-events: ${disabled ? 'none' : 'auto'};
`;

/** Standalone: its own outlined box. Grouped: a bare row; the group draws
 * the box and the dividers. */
export const SAccordionBase = styled('div', {
  shouldForwardProp,
})<TSAccordionBaseProps>(shellStyles);

/** Same shell as a drag item, for groups with `onReorder`. DragItem's own
 * styles come last and show a grab cursor everywhere; `&&` outranks it so
 * only the grip looks draggable. */
export const SAccordionBaseDragItem = styled(DragItem, {
  shouldForwardProp,
})<TSAccordionBaseProps>(
  shellStyles,
  `
    && {
      cursor: auto;
    }
  `,
);
