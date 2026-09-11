import styled from '@emotion/styled';
import { SInputTextField } from '../input-text-field/styles';

export const SInputNumberFieldInput = styled(SInputTextField, {
  shouldForwardProp: (prop) => prop !== '$center',
})<{ $center?: boolean }>`
  ${({ theme, $center }) =>
    $center
      ? `
        text-align: center;
        padding-left: ${theme.spacing(theme.gap.sm)};
        padding-right: ${theme.spacing(theme.gap.sm)};
      `
      : ''}

  &[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
  }

  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
  }
`;

export const SInputNumberFieldFlipIcon = styled.span`
  display: inline-flex;
  transform: scaleX(-1);
`;
