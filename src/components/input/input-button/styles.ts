import styled from '@emotion/styled';
import { IconButton } from '../../icon-button';

export const SInputButton = styled(IconButton)`
  && {
    width: auto;
    padding-left: 0.5em;
    padding-right: 0.5em;
  }

  && svg {
    width: 1em;
    height: 1em;
    opacity: 0.7;
  }
`;
