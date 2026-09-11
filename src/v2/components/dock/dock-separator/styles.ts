import styled from '@emotion/styled';
import { TSDockSeparatorProps } from './types';

const customProps = new Set(['orientation']);

export const SDockSeparator = styled('span', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSDockSeparatorProps>`
  flex-shrink: 0;
  align-self: center;
  margin: ${({ theme, orientation }) =>
    orientation === 'vertical'
      ? `${theme.spacing(theme.gap.xs)} 0`
      : `0 ${theme.spacing(theme.gap.xs)}`};
  width: ${({ theme, orientation }) =>
    orientation === 'vertical' ? theme.sizes.xl.icon : '1px'};
  height: ${({ theme, orientation }) =>
    orientation === 'vertical' ? '1px' : theme.sizes.xl.icon};
  background-color: ${({ theme }) => theme.surfaces.divider};
  pointer-events: none;
`;
