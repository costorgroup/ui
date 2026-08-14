import styled from '@emotion/styled';
import { TBreakpoint } from '../../theme/types';
import { TSContainerProps } from './types';

const customProps = new Set(['maxWidth', 'fixed', 'disableGutters']);

const orderedBreakpoints: TBreakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export const SContainer = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSContainerProps>`
  box-sizing: border-box;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: block;

  ${({ theme, disableGutters }) =>
    disableGutters
      ? 'padding-left: 0; padding-right: 0;'
      : `
        padding-left: ${theme.spacing(theme.gap.md)};
        padding-right: ${theme.spacing(theme.gap.md)};

        ${theme.breakpoints.up('sm')} {
          padding-left: ${theme.spacing(theme.gap.lg)};
          padding-right: ${theme.spacing(theme.gap.lg)};
        }
      `}

  ${({ theme, maxWidth, fixed }) => {
    if (fixed) {
      return orderedBreakpoints
        .filter((key) => theme.breakpoints.values[key] > 0)
        .map(
          (key) => `
            ${theme.breakpoints.up(key)} {
              max-width: ${theme.breakpoints.values[key]}${theme.breakpoints.unit};
            }
          `,
        )
        .join('\n');
    }

    if (maxWidth === false) {
      return 'max-width: none;';
    }

    return `
      ${theme.breakpoints.up(maxWidth)} {
        max-width: ${theme.breakpoints.values[maxWidth]}${theme.breakpoints.unit};
      }
    `;
  }}
`;
