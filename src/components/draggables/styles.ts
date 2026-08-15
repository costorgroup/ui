import styled from '@emotion/styled';
import { draggablesClasses } from './classes';
import { TDraggablesProps } from './types';

type TSDraggablesProps = Pick<TDraggablesProps, 'orientation'>;

const customProps = new Set(['orientation']);

export const SDraggables = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSDraggablesProps>`
  display: flex;
  flex-direction: ${({ orientation = 'vertical' }) =>
    orientation === 'horizontal' ? 'row' : 'column'};
  align-items: stretch;
  box-sizing: border-box;
  min-height: 8px;
  min-width: 8px;

  .${draggablesClasses.placeholder} {
    box-sizing: border-box;
    flex-shrink: 0;
    pointer-events: none;
    border-radius: ${({ theme }) => theme.radius.medium};
    background-color: ${({ theme }) =>
      `color-mix(in srgb, ${theme.colors.primary.main} 12%, transparent)`};
    border: 1px dashed
      ${({ theme }) =>
        `color-mix(in srgb, ${theme.colors.primary.main} 36%, transparent)`};
  }
`;
