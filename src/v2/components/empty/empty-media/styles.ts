import styled from '@emotion/styled';
import { CHROME_FILL } from '../../../idle-variant-styles';
import { colorMixBase } from '../../../surface';
import { TSEmptyMediaProps } from './types';

const customProps = new Set(['variant']);

export const SEmptyMedia = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSEmptyMediaProps>`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing(theme.gap.xs)};
  color: ${({ theme }) => theme.surfaces.muted};

  ${({ theme, variant }) =>
    variant === 'icon'
      ? `
          width: 2.5rem;
          height: 2.5rem;
          border-radius: ${theme.radius.md};
          background-color: ${colorMixBase(
            theme.surfaces.ink,
            CHROME_FILL,
            theme.surfaces.background,
          )};

          svg {
            display: block;
            width: 1.25rem;
            height: 1.25rem;
          }
        `
      : `
          background: none;
        `}

  img {
    display: block;
    max-width: 100%;
  }
`;
