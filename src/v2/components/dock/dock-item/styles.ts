import styled from '@emotion/styled';
import { MOTION, reduceMotion } from '../../../motion';
import { IconButton } from '../../icon-button';
import { TSDockItemProps } from './types';

const lift = (gap: string) => `translateY(-${gap}) scale(1.05)`;

export const SDockItem = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<TSDockItemProps>`
  && {
    transition: transform ${MOTION.duration} ${MOTION.easing};
    transform: ${({ active, theme, size = 'md', disabled }) =>
      active && !disabled ? lift(theme.sizes[size].gap) : 'none'};
  }

  && svg {
    transition: transform ${MOTION.duration} ${MOTION.easing};
    transform: ${({ active, disabled }) =>
      active && !disabled ? 'scale(1.1)' : 'none'};
  }

  &&:hover:not(:disabled),
  &&:focus-visible:not(:disabled) {
    transform: ${({ active, theme, size = 'md' }) =>
      active ? lift(theme.sizes[size].gap) : 'none'};
  }

  &&:active:not(:disabled) {
    transform: none;
  }

  &&:hover:not(:disabled) svg,
  &&:focus-visible:not(:disabled) svg {
    transform: ${({ active }) => (active ? 'scale(1.1)' : 'none')};
  }

  ${reduceMotion}
`;
