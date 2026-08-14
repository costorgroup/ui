import styled from '@emotion/styled';
import { TCenterOwnProps } from './types';

type TSCenterProps = Pick<TCenterOwnProps, 'absolute' | 'axis' | 'inline'>;

const customProps = new Set(['absolute', 'axis', 'inline']);

export const SCenter = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSCenterProps>`
  ${({ absolute = false, axis = 'both', inline = false }) => {
    if (absolute) {
      if (axis === 'horizontal') {
        return `
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        `;
      }

      if (axis === 'vertical') {
        return `
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        `;
      }

      return `
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      `;
    }

    return `
      display: ${inline ? 'inline-flex' : 'flex'};
      ${
        axis === 'horizontal' || axis === 'both'
          ? 'justify-content: center;'
          : ''
      }
      ${axis === 'vertical' || axis === 'both' ? 'align-items: center;' : ''}
    `;
  }}
`;
