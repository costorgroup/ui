import styled from '@emotion/styled';
import { buttonClasses } from '../button/classes';
import { iconButtonClasses } from '../icon-button/classes';
import { inputWrapperClasses } from '../input/input-wrapper/classes';
import { TInputGroupProps } from './types';

type TSInputGroupProps = Pick<TInputGroupProps, 'orientation'>;

const customProps = new Set(['orientation']);

const itemSelector = `& > .${inputWrapperClasses.root}, & > .${buttonClasses.root}, & > .${iconButtonClasses.root}`;

export const SInputGroup = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSInputGroupProps>`
  display: inline-flex;
  flex-direction: ${({ orientation = 'horizontal' }) =>
    orientation === 'vertical' ? 'column' : 'row'};
  align-items: stretch;
  vertical-align: top;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  ${itemSelector} {
    position: relative;
    width: auto;
  }

  & > .${inputWrapperClasses.root} {
    flex: 1 1 auto;
    min-width: 0;
  }

  ${itemSelector}:hover,
  ${itemSelector}:focus-visible,
  ${itemSelector}:focus-within {
    z-index: 1;
  }

  ${({ orientation = 'horizontal' }) =>
    orientation === 'vertical'
      ? `
        ${itemSelector} {
          & + .${inputWrapperClasses.root},
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
          & + .${inputWrapperClasses.root},
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
