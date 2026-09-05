import { css, SerializedStyles } from '@emotion/react';

export const playModeRingStyles = (
  selector: string,
  animation: SerializedStyles | string,
) => css`
  &[data-play='always'] ${selector} {
    animation: ${animation};
  }

  &[data-play='hover']:hover ${selector} {
    animation: ${animation};
  }

  @media (prefers-reduced-motion: reduce) {
    &[data-play='always'] ${selector},
    &[data-play='hover']:hover ${selector} {
      animation: none;
    }
  }
`;
