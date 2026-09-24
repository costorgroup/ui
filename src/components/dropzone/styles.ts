import styled from '@emotion/styled';
import type { TGap, TPaletteColor, TTheme } from '../../theme/types';
import {
  colorMix,
  fieldBackground,
  fieldBorderColor,
  fieldFocusRing,
} from '../../helpers/variant-styles/surface';
import type { TInputVariant } from '../input/input-wrapper/types';
import type { TDropzoneSize, TDropzoneSpacing } from './types';

type TSDropzoneProps = {
  color: TPaletteColor;
  variant: TInputVariant;
  active: boolean;
  disabled: boolean;
  size: TDropzoneSize;
  padding?: TDropzoneSpacing;
  gap?: TDropzoneSpacing;
  hasPreview: boolean;
};

const customProps = new Set([
  'color',
  'variant',
  'active',
  'disabled',
  'size',
  'padding',
  'gap',
  'hasPreview',
]);

const SIZES: Record<
  TDropzoneSize,
  { padding: TGap; gap: TGap; icon: string; title: string; description: string }
> = {
  sm: { padding: 'lg', gap: 'sm', icon: '1.5rem', title: '0.875rem', description: '0.75rem' },
  md: { padding: 'xl', gap: 'md', icon: '2rem', title: '1rem', description: '0.875rem' },
  lg: { padding: 'xl', gap: 'lg', icon: '2.5rem', title: '1.125rem', description: '1rem' },
};

const resolveSpacing = (theme: TTheme, value: TDropzoneSpacing) => {
  if (typeof value === 'number') {
    return theme.spacing(value);
  }

  if (value in theme.gap) {
    return theme.spacing(theme.gap[value as TGap]);
  }

  return value;
};

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
  gap: ${({ theme, size, gap }) => resolveSpacing(theme, gap ?? SIZES[size].gap)};
  width: 100%;
  padding: ${({ theme, size, padding, hasPreview }) =>
    resolveSpacing(theme, padding ?? (hasPreview ? 0 : SIZES[size].padding))};
  ${({ size }) => `
    --dropzone-icon-size: ${SIZES[size].icon};
    --dropzone-title-size: ${SIZES[size].title};
    --dropzone-description-size: ${SIZES[size].description};
  `}
  border: 1.5px ${({ hasPreview }) => (hasPreview ? 'solid' : 'dashed')};
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.md};
  text-align: center;
  user-select: none;
  cursor: ${({ disabled, hasPreview }) =>
    disabled ? 'not-allowed' : hasPreview ? 'default' : 'pointer'};
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
    width: var(--dropzone-icon-size);
    height: var(--dropzone-icon-size);
  }
`;

export const SDropzoneTitle = styled.div`
  font-family: inherit;
  font-size: var(--dropzone-title-size);
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ theme }) => theme.typography.lineHeight.heading};
  color: ${({ theme }) => theme.surfaces.ink};
`;

export const SDropzoneDescription = styled.div`
  max-width: 28rem;
  font-family: inherit;
  font-size: var(--dropzone-description-size);
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

export const SDropzonePreview = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 0;

  img,
  video {
    display: block;
    max-width: 100%;
    height: auto;
  }
`;

export const SDropzoneOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  padding: ${({ theme }) => theme.spacing(theme.gap.md)};
  background-color: rgba(0, 0, 0, 0.55);
  color: #fff;
  font-size: var(--dropzone-title-size);
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease;

  [data-preview='true']:hover > &,
  [data-preview='true']:focus-within > &,
  [data-preview='true'][data-active='true'] > & {
    opacity: 1;
    pointer-events: auto;
  }

  [data-disabled='true'] > & {
    display: none;
  }
`;

export const SDropzoneActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
`;
