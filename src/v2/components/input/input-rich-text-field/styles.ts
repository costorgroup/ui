import styled from '@emotion/styled';
import type { TInputSize } from '../input-wrapper/types';

const sizeFont: Record<TInputSize, string> = {
  xs: '12px',
  sm: '13px',
  md: '14px',
  lg: '16px',
  xl: '18px',
};

export const SInputRichTextField = styled('div', {
  shouldForwardProp: (prop) => prop !== 'size',
})<{ size: TInputSize }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};

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
`;

export const SInputRichTextToolbar = styled('div')`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(theme.gap.xs)};
  padding: var(--rtf-pad-y) var(--rtf-pad-x);
  border-bottom: 1px solid
    ${({ theme }) =>
      `color-mix(in lab, ${theme.colors.base.main} 12%, transparent)`};
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
