import styled from '@emotion/styled';
import type { TInputSize } from '../input/input-wrapper/types';

type TSActionFieldBarProps = {
  size: TInputSize;
};

const customProps = new Set(['size']);

export const SActionFieldBar = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSActionFieldBarProps>`
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: ${({ theme, size }) => {
    const scale = theme.sizeScale[size];
    const padY = theme.spacing(theme.gap.xs);
    const padX = theme.spacing(theme.gap.sm);

    return `0 calc(${padX} * ${scale}) calc(${padY} * ${scale})`;
  }};
`;
