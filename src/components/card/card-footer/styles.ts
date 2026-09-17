import styled from '@emotion/styled';
import { CHROME_IDLE } from '../../../helpers/variant-styles';
import { colorMix } from '../../../helpers/variant-styles/surface';
import { TSCardFooterProps } from './types';

const customProps = new Set(['variant']);

export const SCardFooter = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSCardFooterProps>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  padding: var(--card-spacing);
  min-width: 0;

  ${({ theme, variant }) =>
    variant === 'muted'
      ? `
          border-top: 1px solid ${theme.surfaces.divider};
          background-color: ${colorMix(theme.surfaces.mixer, CHROME_IDLE)};
        `
      : ''}
`;
