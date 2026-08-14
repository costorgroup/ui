import styled from '@emotion/styled';
import { SInputWrapper } from '../input/input-wrapper/styles';
import { SButton } from '../button/styles';
import { SIconButton } from '../icon-button/styles';
import { TInputGroupProps } from './types';

type TSInputGroupProps = Pick<TInputGroupProps, 'orientation'>;

const customProps = new Set(['orientation']);

const itemSelector = `& > ${SInputWrapper}, & > ${SButton}, & > ${SIconButton}`;

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

  & > ${SInputWrapper} {
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
          & + ${SInputWrapper},
          & + ${SButton},
          & + ${SIconButton} {
            margin-top: -1px;
          }

          &:not(:first-child):not(:last-child) {
            border-radius: 0;
          }

          &:first-child:not(:last-child) {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }

          &:last-child:not(:first-child) {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
          }
        }
      `
      : `
        ${itemSelector} {
          & + ${SInputWrapper},
          & + ${SButton},
          & + ${SIconButton} {
            margin-left: -1px;
          }

          &:not(:first-child):not(:last-child) {
            border-radius: 0;
          }

          &:first-child:not(:last-child) {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }

          &:last-child:not(:first-child) {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
        }
      `}
`;
