import styled from '@emotion/styled';
import { TInputSize } from '../input-wrapper/types';
import {
  TSInputColorFieldDropdownProps,
  TSInputColorFieldTriggerProps,
} from './types';

const triggerProps = new Set(['variant', 'size', 'color', 'open']);
const dropdownProps = new Set(['top', 'left', 'width', 'visible', 'placement']);

const sizeFont: Record<TInputSize, string> = {
  xs: '12px',
  sm: '13px',
  md: '14px',
  lg: '16px',
  xl: '18px',
};

export const SInputColorField = styled.div`
  position: relative;
  display: inline-flex;
  width: 100%;
  box-sizing: border-box;
`;

export const SInputColorFieldTrigger = styled('button', {
  shouldForwardProp: (prop) => !triggerProps.has(prop),
})<TSInputColorFieldTriggerProps>`
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

export const SInputColorFieldValue = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  flex: 1;
  min-width: 0;
`;

export const SInputColorFieldSwatch = styled.span`
  display: block;
  box-sizing: border-box;
  width: 1.35em;
  height: 1.35em;
  flex-shrink: 0;
  border: 1px solid
    color-mix(
      in srgb,
      ${({ theme }) => theme.colors.common.black} 16%,
      transparent
    );
  border-radius: ${({ theme }) => theme.radius.small};
  background-color: #fff;
  background-image:
    linear-gradient(
      var(--input-color-swatch, #000),
      var(--input-color-swatch, #000)
    ),
    conic-gradient(
      ${({ theme }) => theme.colors.common.grey[6]} 0.25turn,
      ${({ theme }) => theme.colors.common.grey[2]} 0 0.5turn,
      ${({ theme }) => theme.colors.common.grey[6]} 0 0.75turn,
      ${({ theme }) => theme.colors.common.grey[2]} 0
    );
  background-size:
    100% 100%,
    0.45em 0.45em;
`;

export const SInputColorFieldText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SInputColorFieldPlaceholder = styled.span`
  opacity: 0.5;
`;

export const SInputColorFieldChevron = styled('span', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  opacity: 0.7;
  transform: ${({ open }) => (open ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
`;

export const SInputColorFieldDropdown = styled('div', {
  shouldForwardProp: (prop) => !dropdownProps.has(prop),
})<TSInputColorFieldDropdownProps>`
  position: fixed;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
  z-index: ${({ theme }) => theme.zIndex.tooltip};
  box-sizing: border-box;
  width: ${({ width }) => `${width}px`};
  max-width: 300px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radius.medium};
  background-color: ${({ theme }) => theme.colors.common.white};
  box-shadow: ${({ theme }) => {
    const black = theme.colors.common.black;

    return `
      0 4px 10px ${black}0a,
      0 1px 4px ${black}08,
      0 1px 2px ${black}05
    `;
  }};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) => (visible ? 'scale(1)' : 'scale(0.96)')};
  transform-origin: ${({ placement }) =>
    placement === 'top' ? 'bottom right' : 'top right'};
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
  transition:
    opacity 0.12s ease,
    transform 0.12s ease;
`;

export const SInputColorFieldPicker = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SInputColorFieldSpectrum = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border: 0;
  border-radius: ${({ theme }) =>
    `${theme.radius.medium} ${theme.radius.medium} 0 0`};
  box-shadow: inset 0 0 0 1px
    color-mix(
      in srgb,
      ${({ theme }) => theme.colors.common.black} 12%,
      transparent
    );
  touch-action: none;
  cursor: crosshair;
  background:
    linear-gradient(to top, #000, transparent),
    linear-gradient(to right, #fff, var(--input-color-hue, #f00));
`;

export const SInputColorFieldSpectrumMarker = styled.span`
  position: absolute;
  width: 14px;
  height: 14px;
  box-sizing: border-box;
  border: 2px solid ${({ theme }) => theme.colors.common.white};
  border-radius: ${({ theme }) => theme.radius.circle};
  box-shadow:
    0 0 0 1px
      color-mix(
        in srgb,
        ${({ theme }) => theme.colors.common.black} 35%,
        transparent
      ),
    0 1px 4px
      color-mix(
        in srgb,
        ${({ theme }) => theme.colors.common.black} 25%,
        transparent
      );
  transform: translate(-50%, -50%);
  pointer-events: none;
  background: var(--input-color-opaque, #000);
`;

export const SInputColorFieldControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  padding: ${({ theme }) => theme.spacing(theme.gap.md)};
`;

export const SInputColorFieldPreview = styled.span`
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 28px;
  height: 28px;
  border: 1px solid
    color-mix(
      in srgb,
      ${({ theme }) => theme.colors.common.black} 16%,
      transparent
    );
  border-radius: ${({ theme }) => theme.radius.circle};
  background-color: #fff;
  background-image:
    linear-gradient(
      var(--input-color-swatch, #000),
      var(--input-color-swatch, #000)
    ),
    conic-gradient(
      ${({ theme }) => theme.colors.common.grey[6]} 0.25turn,
      ${({ theme }) => theme.colors.common.grey[2]} 0 0.5turn,
      ${({ theme }) => theme.colors.common.grey[6]} 0 0.75turn,
      ${({ theme }) => theme.colors.common.grey[2]} 0
    );
  background-size:
    100% 100%,
    8px 8px;
`;

export const SInputColorFieldSliders = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  min-width: 0;
  margin-left: ${({ theme }) => theme.spacing(theme.gap.md)};
`;

export const SInputColorFieldHue = styled.div`
  position: relative;
  width: 100%;
  height: 14px;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.pill};
  box-shadow: ${({ theme }) => {
    const black = theme.colors.common.black;

    return `
      0 4px 10px ${black}0a,
      0 1px 4px ${black}08,
      0 1px 2px ${black}05
    `;
  }};
  touch-action: none;
  cursor: pointer;
  background: linear-gradient(
    to right,
    #ff0000,
    #ffff00,
    #00ff00,
    #00ffff,
    #0000ff,
    #ff00ff,
    #ff0000
  );
`;

export const SInputColorFieldAlpha = styled.div`
  position: relative;
  width: 100%;
  height: 14px;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.pill};
  box-shadow: ${({ theme }) => {
    const black = theme.colors.common.black;

    return `
      0 4px 10px ${black}0a,
      0 1px 4px ${black}08,
      0 1px 2px ${black}05
    `;
  }};
  touch-action: none;
  cursor: pointer;
  background-color: #fff;
  background-image:
    linear-gradient(
      to right,
      transparent,
      var(--input-color-opaque, #f00)
    ),
    conic-gradient(
      ${({ theme }) => theme.colors.common.grey[6]} 0.25turn,
      ${({ theme }) => theme.colors.common.grey[2]} 0 0.5turn,
      ${({ theme }) => theme.colors.common.grey[6]} 0 0.75turn,
      ${({ theme }) => theme.colors.common.grey[2]} 0
    );
  background-size:
    100% 100%,
    8px 8px;
`;

export const SInputColorFieldSliderMarker = styled.span`
  position: absolute;
  top: 50%;
  width: 14px;
  height: 14px;
  box-sizing: border-box;
  border: 2px solid ${({ theme }) => theme.colors.common.white};
  border-radius: ${({ theme }) => theme.radius.circle};
  box-shadow: 0 0 0 1px
    color-mix(
      in srgb,
      ${({ theme }) => theme.colors.common.black} 35%,
      transparent
    );
  transform: translate(-50%, -50%);
  pointer-events: none;
  background: var(--input-color-hue, #f00);
`;
