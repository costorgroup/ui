import styled from '@emotion/styled';
import { TSCardProps } from './types';

const customProps = new Set(['radius']);

export const SCard = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSCardProps>`
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100%;
  overflow: hidden;
  border-radius: ${({ theme, radius }) => theme.radius[radius]};
  background-color: ${({ theme }) => theme.colors.common.white};
  box-shadow: ${({ theme }) => {
    const black = theme.colors.common.black;

    return `
      0 4px 10px ${black}0a,
      0 1px 4px ${black}08,
      0 1px 2px ${black}05
    `;
  }};
`;
