import styled from '@emotion/styled';
import { MOTION, reduceMotion } from '../../../motion';
import { IconButton } from '../../icon-button';

export const SDockItem = styled(IconButton)`
  && {
    transition: transform ${MOTION.duration} ${MOTION.easing};
  }

  && svg {
    transition: transform ${MOTION.duration} ${MOTION.easing};
  }

  &&:hover:not(:disabled),
  &&:focus-visible:not(:disabled) {
    transform: translateY(-${({ theme }) => theme.spacing(theme.gap.xs)})
      scale(1.05);
  }

  &&:active:not(:disabled) {
    transform: none;
  }

  &&:hover:not(:disabled) svg,
  &&:focus-visible:not(:disabled) svg {
    transform: scale(1.1);
  }

  ${reduceMotion}
`;
