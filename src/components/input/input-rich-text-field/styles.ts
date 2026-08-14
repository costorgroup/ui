import styled from '@emotion/styled';
import type { TInputSize, TInputVariant } from '../input-wrapper/types';
import type { TPaletteColor } from '../../../theme/types';

type TSInputRichTextFieldProps = {
  variant: TInputVariant;
  size: TInputSize;
  color: TPaletteColor;
  disabled: boolean;
};

const customProps = new Set(['variant', 'size', 'color', 'disabled']);

const sizeFont: Record<TInputSize, string> = {
  xs: '12px',
  sm: '13px',
  md: '14px',
  lg: '16px',
  xl: '18px',
};

export const SInputRichTextField = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSInputRichTextFieldProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radius.medium};
  font-family: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'text')};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  transition: background-color 0.15s ease, border-color 0.15s ease;
  overflow: hidden;

  ${({ theme, size }) => {
    const scale = theme.sizeScale[size];
    const padY = theme.spacing(theme.gap.sm);
    const padX = theme.spacing(theme.gap.md);

    return `
      font-size: ${sizeFont[size]};

      --rtf-pad-x: calc(${padX} * ${scale});
      --rtf-pad-y: calc(${padY} * ${scale});
    `;
  }}

  ${({ theme, variant, color }) => {
    const palette = theme.colors[color];

    switch (variant) {
      case 'surface':
        return `
          background-color: color-mix(
            in srgb,
            ${palette.main} 8%,
            transparent
          );
          color: ${palette.darker};
          border-color: color-mix(
            in srgb,
            ${palette.main} 14%,
            transparent
          );

          &:hover {
            background-color: color-mix(
              in srgb,
              ${palette.main} 10%,
              transparent
            );
            border-color: color-mix(
              in srgb,
              ${palette.main} 20%,
              transparent
            );
          }

          &:focus-within {
            background-color: color-mix(
              in srgb,
              ${palette.main} 10%,
              transparent
            );
            border-color: color-mix(
              in srgb,
              ${palette.main} 28%,
              transparent
            );
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${palette.main};
          border-color: color-mix(
            in srgb,
            ${palette.main} 36%,
            transparent
          );

          &:hover {
            background-color: color-mix(
              in srgb,
              ${palette.main} 4%,
              transparent
            );
            border-color: color-mix(
              in srgb,
              ${palette.main} 52%,
              transparent
            );
            color: ${palette.dark};
          }

          &:focus-within {
            background-color: color-mix(
              in srgb,
              ${palette.main} 4%,
              transparent
            );
            border-color: color-mix(
              in srgb,
              ${palette.main} 68%,
              transparent
            );
            color: ${palette.darker};
          }
        `;
      case 'subtle':
      default:
        return `
          background-color: color-mix(
            in srgb,
            ${palette.main} 4%,
            transparent
          );
          color: ${palette.darker};
          border-color: transparent;

          &:hover {
            background-color: color-mix(
              in srgb,
              ${palette.main} 8%,
              transparent
            );
          }

          &:focus-within {
            background-color: color-mix(
              in srgb,
              ${palette.main} 10%,
              transparent
            );
          }
        `;
    }
  }}
`;

export const SInputRichTextToolbar = styled('div')`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(theme.gap.xs)};
  padding: var(--rtf-pad-y) var(--rtf-pad-x);
  border-bottom: 1px solid
    ${({ theme }) =>
      `color-mix(in srgb, ${theme.colors.default.main} 12%, transparent)`};
`;

export const SInputRichTextToolbarGroup = styled('div')`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(theme.gap.xs)};
`;

export const SInputRichTextContent = styled('div')<{ minHeight: string }>`
  min-height: ${({ minHeight }) => minHeight};
  padding: var(--rtf-pad-y) var(--rtf-pad-x);

  .tiptap {
    outline: none;
    min-height: inherit;
  }

  .tiptap p {
    margin: 0;
  }

  .tiptap p + p {
    margin-top: 0.5em;
  }

  .tiptap ul,
  .tiptap ol {
    margin: 0.5em 0;
    padding-left: 1.25em;
  }

  .tiptap blockquote {
    margin: 0.5em 0;
    padding-left: 0.75em;
    border-left: 3px solid currentColor;
    opacity: 0.85;
  }

  .tiptap code {
    font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas,
      'Liberation Mono', monospace;
    font-size: 0.9em;
  }

  .tiptap pre {
    margin: 0.5em 0;
    padding: 0.5em 0.75em;
    border-radius: ${({ theme }) => theme.radius.small};
    background-color: color-mix(
      in srgb,
      currentColor 8%,
      transparent
    );
    overflow-x: auto;
  }

  .tiptap pre code {
    background: none;
    padding: 0;
  }

  .tiptap p.is-editor-empty:first-of-type::before {
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
    opacity: 0.5;
  }
`;
