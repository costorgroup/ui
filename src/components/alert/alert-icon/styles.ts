import styled from '@emotion/styled';
import { TSAlertIconProps } from './types';

const customProps = new Set(['align']);

const alignSelf = { start: 'flex-start', center: 'center', end: 'flex-end' };

export const SAlertIcon = styled('span', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSAlertIconProps>`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  align-self: ${({ align }) => alignSelf[align]};
  /* Optical nudge to sit on the title's first line; only meaningful at top. */
  margin-top: ${({ align }) => (align === 'start' ? '0.1em' : '0')};
  color: inherit;
  line-height: 0;

  & > svg {
    display: block;
    width: var(--alert-icon-size);
    height: var(--alert-icon-size);
  }
`;
