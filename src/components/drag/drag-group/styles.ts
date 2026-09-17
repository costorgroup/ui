import styled from '@emotion/styled';
import { colorMix } from '../../../helpers/variant-styles/surface';
import { dragGroupClasses } from './classes';
import { TSDragGroupProps } from '../types';

const customProps = new Set(['orientation', 'color']);

export const SDragGroup = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSDragGroupProps>`
  display: flex;
  flex-direction: ${({ orientation = 'vertical' }) =>
    orientation === 'horizontal' ? 'row' : 'column'};
  align-items: stretch;
  box-sizing: border-box;
  min-height: 8px;
  min-width: 8px;

  .${dragGroupClasses.placeholder} {
    box-sizing: border-box;
    flex-shrink: 0;
    pointer-events: none;
    border-radius: ${({ theme }) => theme.radius.medium};
    background-color: ${({ theme, color }) => colorMix(theme.palette[color].main, 12)};
    border: 1px dashed ${({ theme, color }) => colorMix(theme.palette[color].main, 36)};
  }
`;
