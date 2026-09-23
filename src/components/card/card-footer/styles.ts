import styled from '@emotion/styled';
import { CHROME_IDLE } from '../../../helpers/variant-styles';
import { colorMix } from '../../../helpers/variant-styles/surface';
import { Flex } from '../../flex';
import { TSCardFooterProps } from './types';

const customProps = new Set(['variant']);

export const SCardFooter = styled(Flex, {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSCardFooterProps>`
  padding: var(--card-spacing);
  min-width: 0;

  ${({ theme, variant }) => {
    if (variant === 'plain') return '';

    return `
      border-top: 1px solid ${theme.surfaces.divider};
      ${variant === 'muted' ? `background-color: ${colorMix(theme.surfaces.mixer, CHROME_IDLE)};` : ''}
    `;
  }}
`;
