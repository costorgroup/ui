import styled from '@emotion/styled';
import { toggleButtonClasses } from '../toggle-button/classes';
import { toggleIconButtonClasses } from '../toggle-icon-button/classes';
import { TToggleButtonGroupProps } from './types';

type TSToggleButtonGroupProps = Pick<TToggleButtonGroupProps, 'orientation'>;

const customProps = new Set(['orientation']);

const itemSelector = `& > .${toggleButtonClasses.root}, & > .${toggleIconButtonClasses.root}`;

export const SToggleButtonGroup = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSToggleButtonGroupProps>`
  display: inline-flex;
  flex-direction: ${({ orientation = 'horizontal' }) =>
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

  ${({ orientation = 'horizontal' }) =>
    orientation === 'vertical'
      ? `
        ${itemSelector} {
          & + .${toggleButtonClasses.root},
          & + .${toggleIconButtonClasses.root} {
            margin-top: -1px;
          }

          &:not(:first-of-type):not(:last-of-type) {
            border-radius: 0;
          }

          &:first-of-type:not(:last-of-type) {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }

          &:last-of-type:not(:first-of-type) {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
          }
        }
      `
      : `
        ${itemSelector} {
          & + .${toggleButtonClasses.root},
          & + .${toggleIconButtonClasses.root} {
            margin-left: -1px;
          }

          &:not(:first-of-type):not(:last-of-type) {
            border-radius: 0;
          }

          &:first-of-type:not(:last-of-type) {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }

          &:last-of-type:not(:first-of-type) {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
        }
      `}
`;
