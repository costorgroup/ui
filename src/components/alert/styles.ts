import styled from '@emotion/styled';
import IconButton from '../icon-button';

export const SAlertClose = styled(IconButton)`
  position: absolute;
  top: ${({ theme }) => theme.spacing(theme.gap.sm)};
  right: ${({ theme }) => theme.spacing(theme.gap.sm)};
  color: inherit;

  &:hover:not(:disabled),
  &:active:not(:disabled) {
    color: inherit;
    background-color: color-mix(in srgb, currentColor 12%, transparent);
  }
`;
