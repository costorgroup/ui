import styled from '@emotion/styled';
import { Card } from '../card';
import { TSGradientCardProps } from './types';

const customProps = new Set(['color', 'padding']);

export const SGradientCard = styled(Card, {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSGradientCardProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  background: ${({ theme, color }) => {
    const palette = theme.colors[color];
    return `linear-gradient(
      135deg,
      ${palette.light} 0%,
      ${palette.main} 50%,
      ${palette.dark} 100%
    )`;
  }};

  && {
    padding: ${({ theme, padding }) => theme.spacing(theme.gap[padding])};
  }
`;
