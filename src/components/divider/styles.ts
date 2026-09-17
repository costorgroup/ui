import styled from '@emotion/styled';
import { colorMix } from '../../helpers/variant-styles/surface';
import { TDividerSize, TSDividerProps } from './types';

// Same recipe the Marker component's separator/border line uses: the
// mode-aware divider token for the neutral case, a semi-transparent tint of
// the accent for everything else, so every color reads consistently.
const ACCENT_LINE_TINT = 30;

const customProps = new Set(['orientation', 'variant', 'size', 'color', 'labeled']);

const thickness: Record<TDividerSize, string> = {
  xs: '1px',
  sm: '1px',
  md: '2px',
  lg: '3px',
  xl: '4px',
};

export const SDivider = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSDividerProps>`
  box-sizing: border-box;
  border: 0;
  margin: 0;
  padding: 0;
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.text.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  white-space: nowrap;

  ${({ theme, color }) => {
    const isDefault = color === 'default';
    const line = isDefault
      ? theme.surfaces.divider
      : colorMix(theme.palette[color].main, ACCENT_LINE_TINT);

    return `
      --divider-line: ${line};
      color: ${isDefault ? theme.surfaces.muted : theme.palette[color].main};
    `;
  }}

  ${({ orientation, labeled, size, variant }) => {
    const line = `${thickness[size]} ${variant} var(--divider-line)`;

    if (orientation === 'vertical') {
      if (labeled) {
        return `
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          align-self: stretch;
          height: auto;
          min-height: 4rem;
          width: auto;
          gap: 0.5rem;

          &::before,
          &::after {
            content: '';
            flex: 1 1 auto;
            width: 0;
            border-left: ${line};
          }
        `;
      }

      return `
        display: inline-block;
        align-self: stretch;
        width: 0;
        min-height: 1em;
        height: auto;
        border-left: ${line};
      `;
    }

    if (labeled) {
      return `
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        gap: 0.75rem;

        &::before,
        &::after {
          content: '';
          flex: 1 1 auto;
          height: 0;
          border-top: ${line};
        }
      `;
    }

    return `
      display: block;
      width: 100%;
      height: 0;
      border-top: ${line};
    `;
  }}
`;
