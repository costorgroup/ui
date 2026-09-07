import styled from '@emotion/styled';
import { IconButton } from '../icon-button';

export const SAlertClose = styled(IconButton)`
  position: absolute;
  top: ${({ theme }) => theme.spacing(theme.gap.sm)};
  right: ${({ theme }) => theme.spacing(theme.gap.sm)};

  && {
    color: inherit;
    border-color: transparent;
    background-color: transparent;
  }

  &:hover:not(:disabled),
  &:active:not(:disabled) {
    && {
      color: inherit;
      border-color: transparent;
      background-color: color-mix(in lab, currentColor 12%, transparent);
    }
  }
`;
