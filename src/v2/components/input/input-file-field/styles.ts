import styled from '@emotion/styled';
import { inputInnerResetStyles } from '../variant-styles';
import { TInputSize } from '../input-wrapper/types';

const triggerProps = new Set(['size']);

const sizeFont: Record<TInputSize, string> = {
  xs: '12px',
  sm: '13px',
  md: '14px',
  lg: '16px',
  xl: '18px',
};

export const SInputFileField = styled.div`
  position: relative;
  display: inline-flex;
  width: 100%;
  box-sizing: border-box;
`;

export const SInputFileFieldTrigger = styled('button', {
  shouldForwardProp: (prop) => !triggerProps.has(prop),
})<{ size: TInputSize }>`
  ${inputInnerResetStyles}
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  text-align: left;
  cursor: inherit;
  color: inherit;

  ${({ theme, size }) => {
    const scale = theme.sizeScale[size];

    return `
      padding: calc(${theme.spacing(theme.gap.sm)} * ${scale})
        calc(${theme.spacing(theme.gap.md)} * ${scale});
      font-size: ${sizeFont[size]};
    `;
  }}
`;

export const SInputFileFieldValue = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  flex: 1;
  min-width: 0;
`;

export const SInputFileFieldText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SInputFileFieldPlaceholder = styled.span`
  opacity: 0.5;
`;

export const SInputFileFieldActions = styled.span`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
`;

export const SInputFileFieldHiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
