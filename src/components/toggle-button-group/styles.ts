import styled from '@emotion/styled';
import { colorMix } from '../../helpers/variant-styles/surface';
import { toggleButtonClasses } from '../toggle-button/classes';
import { toggleIconButtonClasses } from '../toggle-icon-button/classes';
import { TSToggleButtonGroupProps } from './types';

const customProps = new Set(['orientation', 'variant', 'color', 'rounded']);

const toggleButton = `.${toggleButtonClasses.root}`;
const toggleIconButton = `.${toggleIconButtonClasses.root}`;
const itemSelector = `& > ${toggleButton}, & > ${toggleIconButton}`;

export const SToggleButtonGroup = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSToggleButtonGroupProps>`
  display: inline-flex;
  flex-direction: ${({ orientation }) =>
    orientation === 'vertical' ? 'column' : 'row'};
  align-items: stretch;
  vertical-align: top;
  box-sizing: border-box;

  ${itemSelector} {
    position: relative;
  }

  ${itemSelector}:hover,
  ${itemSelector}:focus-visible {
    z-index: 1;
  }

  ${({ theme, orientation, variant, color, rounded = false }) => {
    const vertical = orientation === 'vertical';
    const radius = rounded ? theme.radius.pill : undefined;
    const corners = vertical
      ? `
          &:not(:first-of-type):not(:last-of-type) {
            border-radius: 0;
          }

          &:first-of-type:not(:last-of-type) {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            ${radius ? `border-top-left-radius: ${radius}; border-top-right-radius: ${radius};` : ''}
          }

          &:last-of-type:not(:first-of-type) {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            ${radius ? `border-bottom-left-radius: ${radius}; border-bottom-right-radius: ${radius};` : ''}
          }
        `
      : `
          &:not(:first-of-type):not(:last-of-type) {
            border-radius: 0;
          }

          &:first-of-type:not(:last-of-type) {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            ${radius ? `border-top-left-radius: ${radius}; border-bottom-left-radius: ${radius};` : ''}
          }

          &:last-of-type:not(:first-of-type) {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            ${radius ? `border-top-right-radius: ${radius}; border-bottom-right-radius: ${radius};` : ''}
          }
        `;

    const overlap = `
      ${itemSelector} {
        & + ${toggleButton},
        & + ${toggleIconButton} {
          ${vertical ? 'margin-top: -1px;' : 'margin-left: -1px;'}
        }

        ${corners}
      }
    `;

    const palette = theme.palette[color];
    const painted =
      variant === 'outline' || variant === 'surface'
        ? null
        : variant === 'ghost' || variant === 'plain'
          ? theme.surfaces.border
          : variant === 'subtle'
            ? palette.main
            : colorMix(palette.contrastText, 30);

    if (!painted) {
      const lead = vertical ? 'border-top-color' : 'border-left-color';
      const trail = vertical ? 'border-bottom-color' : 'border-right-color';

      return `
        ${overlap}

        ${itemSelector}:not(:first-of-type):is(:hover, :focus-visible, :active, [aria-pressed='true']) {
          ${lead}: ${palette.main};
        }

        ${itemSelector}:not(:last-of-type):is(:hover, :focus-visible, :active, [aria-pressed='true']) {
          ${trail}: ${palette.main};
        }
      `;
    }

    const divider = vertical
      ? `inset 0 -1px 0 ${painted}`
      : `inset -1px 0 0 ${painted}`;

    return `
      ${overlap}

      ${itemSelector}:not(:last-of-type) {
        box-shadow: ${divider};
      }
    `;
  }}
`;
