import styled from '@emotion/styled';
import { inputButtonClasses } from '../input-button/classes';
import { TInputActionsOrientation } from './types';

type TSInputActionsProps = {
  orientation: TInputActionsOrientation;
};

export const SInputActions = styled('div', {
  shouldForwardProp: (prop) => prop !== 'orientation',
})<TSInputActionsProps>`
  display: inline-flex;
  flex-shrink: 0;
  box-sizing: border-box;
  align-items: ${({ orientation }) =>
    orientation === 'vertical' ? 'stretch' : 'center'};
  flex-direction: ${({ orientation }) =>
    orientation === 'vertical' ? 'column' : 'row'};
  gap: ${({ theme, orientation }) =>
    orientation === 'vertical' ? 0 : theme.spacing(theme.gap.xs)};

  ${({ orientation }) =>
    orientation === 'vertical' &&
    `
      align-self: stretch;
      height: auto;

      & > .${inputButtonClasses.root} {
        flex: 1 1 0;
        width: 1.75em;
        min-width: 0;
        height: auto;
        min-height: 0;
      }
    `}
`;
