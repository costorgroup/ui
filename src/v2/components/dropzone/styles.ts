import styled from '@emotion/styled';
import type { TPaletteColor, TTheme } from '../../../theme/types';
import {
  colorMix,
  fieldBackground,
  fieldBorderColor,
  fieldFocusRing,
} from '../../surface';
import type { TInputVariant } from '../input/input-wrapper/types';

type TSDropzoneProps = {
  color: TPaletteColor;
  variant: TInputVariant;
  active: boolean;
  disabled: boolean;
};

const customProps = new Set(['color', 'variant', 'active', 'disabled']);

const dropzoneFill = (variant: TInputVariant, theme: TTheme) =>
  variant === 'outline' ? 'transparent' : fieldBackground(theme);

const dropzoneBorder = (
  variant: TInputVariant,
  theme: TTheme,
  hover = false,
) => (variant === 'subtle' ? 'transparent' : fieldBorderColor(theme, hover));

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
  border-radius: ${({ theme }) => theme.radius.md};
  text-align: center;
  user-select: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.55 : 1)};
  color: ${({ theme }) => theme.surfaces.ink};
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease,
    box-shadow 0.15s ease;

  ${({ theme, color, variant, active, disabled }) => {
    const palette = theme.palette[color];
    const idleBg = dropzoneFill(variant, theme);
    const idleBorder = dropzoneBorder(variant, theme);
    const hoverBg =
      variant === 'outline' ? colorMix(theme.surfaces.mixer, 4) : idleBg;
    const hoverBorder = dropzoneBorder(variant, theme, true);
    const activeBg = colorMix(palette.main, 8);
    const activeBorder = colorMix(palette.main, 56);

    return `
      background-color: ${active && !disabled ? activeBg : idleBg};
      border-color: ${active && !disabled ? activeBorder : idleBorder};

      ${
        disabled
          ? ''
          : `
        &:hover {
          background-color: ${active ? activeBg : hoverBg};
          border-color: ${active ? activeBorder : hoverBorder};
        }

        &:focus-visible {
          outline: none;
          box-shadow: ${fieldFocusRing(palette.main)};
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
  color: ${({ theme }) => theme.surfaces.ink};
`;

export const SDropzoneDescription = styled.div`
  max-width: 28rem;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  color: ${({ theme }) => theme.surfaces.muted};
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
