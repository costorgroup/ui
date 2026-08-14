import styled from '@emotion/styled';
import { TInputSize } from '../input-wrapper/types';
import { TSInputFileFieldTriggerProps } from './types';

const triggerProps = new Set(['variant', 'size', 'color', 'open']);

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
})<TSInputFileFieldTriggerProps>`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  width: 100%;
  margin: 0;
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radius.medium};
  font-family: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  text-align: left;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.55 : 1)};
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;

  ${({ theme, size }) => {
    const scale = theme.sizeScale[size];

    return `
      padding: calc(${theme.spacing(theme.gap.sm)} * ${scale})
        calc(${theme.spacing(theme.gap.md)} * ${scale});
      font-size: ${sizeFont[size]};
    `;
  }}

  ${({ theme, variant, color }) => {
    const palette = theme.colors[color];

    switch (variant) {
      case 'surface':
        return `
          background-color: color-mix(in srgb, ${palette.main} 8%, transparent);
          color: ${palette.darker};
          border-color: color-mix(in srgb, ${palette.main} 14%, transparent);

          &:hover:not(:disabled) {
            background-color: color-mix(in srgb, ${palette.main} 10%, transparent);
            border-color: color-mix(in srgb, ${palette.main} 20%, transparent);
          }

          &[data-open='true'] {
            background-color: color-mix(in srgb, ${palette.main} 10%, transparent);
            border-color: color-mix(in srgb, ${palette.main} 28%, transparent);
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${palette.main};
          border-color: color-mix(in srgb, ${palette.main} 36%, transparent);

          &:hover:not(:disabled) {
            background-color: color-mix(in srgb, ${palette.main} 4%, transparent);
            border-color: color-mix(in srgb, ${palette.main} 52%, transparent);
            color: ${palette.dark};
          }

          &[data-open='true'] {
            background-color: color-mix(in srgb, ${palette.main} 4%, transparent);
            border-color: color-mix(in srgb, ${palette.main} 68%, transparent);
            color: ${palette.darker};
          }
        `;
      case 'subtle':
      default:
        return `
          background-color: color-mix(in srgb, ${palette.main} 4%, transparent);
          color: ${palette.darker};
          border-color: transparent;

          &:hover:not(:disabled) {
            background-color: color-mix(in srgb, ${palette.main} 8%, transparent);
          }

          &[data-open='true'] {
            background-color: color-mix(in srgb, ${palette.main} 10%, transparent);
          }
        `;
    }
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
