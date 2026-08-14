import styled from '@emotion/styled';
import { TDividerSize, TSDividerProps } from './types';

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
  color: ${({ theme, color }) => theme.colors[color].main};
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.text.small};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  white-space: nowrap;

  ${({ orientation, labeled, size, variant }) => {
    const line = `${thickness[size]} ${variant} currentColor`;

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
