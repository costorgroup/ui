import styled from '@emotion/styled';
import { TAccordionSize } from './context';
import { TSAccordionBaseProps } from './types';

const customProps = new Set(['expanded', 'disabled', 'color', 'variant', 'size']);

const sizeFont: Record<TAccordionSize, string> = {
  xs: '12px',
  sm: '13px',
  md: '14px',
  lg: '16px',
  xl: '18px',
};

export const SAccordionBase = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSAccordionBaseProps>`
  box-sizing: border-box;
  width: 100%;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.medium};
  overflow: hidden;
  font-family: inherit;
  font-size: ${({ size }) => sizeFont[size]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  opacity: ${({ disabled }) => (disabled ? 0.55 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;

  ${({ theme, size }) => {
    const scale = theme.sizeScale[size];

    return `
      --accordion-pad-y: calc(${theme.spacing(theme.gap.sm)} * ${scale});
      --accordion-pad-x: calc(${theme.spacing(theme.gap.md)} * ${scale});
      --accordion-gap: calc(${theme.spacing(theme.gap.sm)} * ${scale});
    `;
  }}

  ${({ theme, variant, color }) => {
    const palette = theme.colors[color];

    switch (variant) {
      case 'solid':
        return `
          background-color: ${palette.main};
          color: ${palette.contrastText};
          border-color: ${palette.main};
        `;
      case 'surface':
        return `
          background-color: color-mix(in srgb, ${palette.lighter} 88%, transparent);
          color: ${palette.darker};
          border-color: color-mix(in srgb, ${palette.main} 24%, transparent);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${palette.main};
          border-color: ${palette.main};
        `;
      case 'ghost':
        return `
          background-color: transparent;
          color: ${palette.darker};
          border-color: transparent;
        `;
      case 'plain':
        return `
          background-color: transparent;
          color: ${palette.darker};
          border-color: transparent;
        `;
      case 'subtle':
      default:
        return `
          background-color: color-mix(in srgb, ${palette.main} 8%, transparent);
          color: ${palette.darker};
          border-color: transparent;
        `;
    }
  }}
`;
