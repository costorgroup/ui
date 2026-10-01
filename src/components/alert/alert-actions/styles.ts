import styled from '@emotion/styled';
import { TSAlertActionsProps } from './types';

const customProps = new Set(['align']);

const alignSelf = { start: 'flex-start', center: 'center', end: 'flex-end' };

// Default align-self (no `align`) comes from AlertBody, per placement.
export const SAlertActions = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSAlertActionsProps>`
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  ${({ align }) => (align != null ? `align-self: ${alignSelf[align]};` : '')}
`;
