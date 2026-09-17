import styled from '@emotion/styled';
import { IconButton } from '../../icon-button';
import { TSSliderControlOriginProps } from './types';

const customProps = new Set(['origin']);

export const SSliderControlOrigin = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSSliderControlOriginProps>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: auto;
  ${({ origin }) => (origin === 'prev' ? 'left: 0;' : 'right: 0;')}
`;

export const SSliderControl = styled(IconButton)`
  flex-shrink: 0;
`;
