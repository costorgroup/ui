import styled from '@emotion/styled';
import { TSLayoutProps } from './types';

const customProps = new Set(['direction', 'bordered', 'divider']);

export const SLayout = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSLayoutProps>`
  display: flex;
  box-sizing: border-box;
  flex-direction: ${({ direction }) =>
    direction === 'vertical' ? 'column' : 'row'};
  align-items: stretch;
  width: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border: ${({ theme, bordered }) =>
    bordered ? `1px solid ${theme.surfaces.border}` : 'none'};

  ${({ theme, direction, divider }) => {
    if (!divider) {
      return '';
    }

    const edge =
      direction === 'vertical' ? 'border-bottom' : 'border-right';

    return `
      & > *:not(:last-child) {
        ${edge}: 1px solid ${theme.surfaces.divider};
      }
    `;
  }}
`;
