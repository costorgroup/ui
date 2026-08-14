import styled from '@emotion/styled';
import { buttonClasses } from '../button/classes';
import { iconButtonClasses } from '../icon-button/classes';
import { TButtonGroupProps } from './types';

type TSButtonGroupProps = Pick<TButtonGroupProps, 'orientation'>;

const customProps = new Set(['orientation']);

const itemSelector = `& > .${buttonClasses.root}, & > .${iconButtonClasses.root}`;

export const SButtonGroup = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSButtonGroupProps>`
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
          & + .${buttonClasses.root},
          & + .${iconButtonClasses.root} {
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
          & + .${buttonClasses.root},
          & + .${iconButtonClasses.root} {
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
