import styled from '@emotion/styled';
import { SButton } from '../button/styles';
import { SIconButton } from '../icon-button/styles';
import { TButtonGroupProps } from './types';

type TSButtonGroupProps = Pick<TButtonGroupProps, 'orientation'>;

const customProps = new Set(['orientation']);

const itemSelector = `& > ${SButton}, & > ${SIconButton}`;

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
