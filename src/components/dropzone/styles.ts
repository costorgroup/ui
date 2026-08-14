import styled from '@emotion/styled';
import type { TPaletteColor } from '../../theme/types';

type TSDropzoneProps = {
  color: TPaletteColor;
  active: boolean;
  disabled: boolean;
};

const customProps = new Set(['color', 'active', 'disabled']);

export const SDropzone = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSDropzoneProps>`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(theme.gap.md)};
  width: 100%;
  padding: ${({ theme }) => theme.spacing(theme.gap.xl)};
  border: 1.5px dashed;
  border-radius: ${({ theme }) => theme.radius.medium};
  text-align: center;
  user-select: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.55 : 1)};
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;

  ${({ theme, color, active, disabled }) => {
    const palette = theme.colors[color];
    const idleBg = `color-mix(in srgb, ${palette.main} 4%, transparent)`;
    const activeBg = `color-mix(in srgb, ${palette.main} 8%, transparent)`;

    return `
      color: ${palette.darker};
      border-color: color-mix(in srgb, ${palette.main} 40%, transparent);
      background-color: ${active && !disabled ? activeBg : idleBg};

      ${
        disabled
          ? ''
          : `
        &:hover {
          background-color: ${activeBg};
          border-color: color-mix(in srgb, ${palette.main} 56%, transparent);
        }

        &:focus-visible {
          outline: 2px solid ${palette.main};
          outline-offset: 2px;
        }
      `
      }
    `;
  }}
`;

export const SDropzoneIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: inherit;

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

export const SDropzoneTitle = styled.div`
  font-family: inherit;
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ theme }) => theme.typography.lineHeight.heading};
  color: inherit;
`;

export const SDropzoneDescription = styled.div`
  max-width: 28rem;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  color: ${({ theme }) => theme.colors.common.grey[12]};
`;

export const SDropzoneInput = styled.input`
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
