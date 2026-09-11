import styled from '@emotion/styled';
import { inputInnerResetStyles } from '../input/variant-styles';
import { TInputSize } from '../input/input-wrapper/types';

export const SNativeSelectRoot = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
  min-width: 0;
`;

export const SNativeSelectField = styled('select', {
  shouldForwardProp: (prop) => prop !== 'fieldSize',
})<{ fieldSize: TInputSize }>`
  ${inputInnerResetStyles}
  display: block;
  flex: 1;
  min-width: 0;
  width: 100%;
  margin: 0;
  appearance: none;
  cursor: inherit;
  color: inherit;
  font-family: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};

  ${({ theme, fieldSize }) => {
    const step = theme.sizes[fieldSize];

    return `
      padding: ${step.padY} ${step.padX};
      padding-right: calc(${step.padX} + ${step.icon});
      font-size: ${step.fontSize};
    `;
  }}
`;

export const SNativeSelectChevron = styled.span`
  position: absolute;
  top: 50%;
  right: ${({ theme }) => theme.spacing(theme.gap.sm)};
  display: inline-flex;
  pointer-events: none;
  transform: translateY(-50%);
`;
