import styled from '@emotion/styled';
import {
  TTabsAnchor,
  TTabsSize,
  TTabsTextAlign,
  TTabsVariant,
} from '../../tabs/tabs-base/types';

type TSTabBaseProps = {
  active: boolean;
  variant: TTabsVariant;
  anchor: TTabsAnchor;
  size: TTabsSize;
  textAlign: TTabsTextAlign;
};

const customProps = new Set(['active', 'variant', 'anchor', 'size', 'textAlign']);

const sizeFont: Record<TTabsSize, string> = {
  xs: '12px',
  sm: '13px',
  md: '14px',
  lg: '16px',
  xl: '18px',
};

const textAlignMap: Record<TTabsTextAlign, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
};

const lineActiveBorder = (anchor: TTabsAnchor) => {
  switch (anchor) {
    case 'top':
      return `
        margin-top: -2px;
        border-top: 3px solid var(--tabs-main);
      `;
    case 'bottom':
      return `
        margin-bottom: -2px;
        border-bottom: 3px solid var(--tabs-main);
      `;
    case 'left':
      return `
        margin-left: -2px;
        border-left: 3px solid var(--tabs-main);
      `;
    case 'right':
      return `
        margin-right: -2px;
        border-right: 3px solid var(--tabs-main);
      `;
  }
};

export const STabBase = styled('button', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSTabBaseProps>`
  display: inline-flex;
  align-items: center;
  justify-content: ${({ textAlign }) => textAlignMap[textAlign]};
  gap: ${({ theme, size }) =>
    `calc(${theme.spacing(theme.gap.sm)} * ${theme.sizeScale[size]})`};
  margin: 0;
  border: 1px solid transparent;
  border-radius: 0;
  background: transparent;
  color: var(--tabs-muted);
  font-family: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1.2;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;

  ${({ theme, size }) => {
    const scale = theme.sizeScale[size];
    const padY = `calc(${theme.spacing(theme.gap.sm)} * ${scale})`;
    const padX = `calc(${theme.spacing(theme.gap.md)} * ${scale})`;

    return `
      padding: ${padY} ${padX};
      font-size: ${sizeFont[size]};
    `;
  }}

  &:hover:not(:disabled):not([aria-selected='true']) {
    color: var(--tabs-dark);
  }

  &:active:not(:disabled):not([aria-selected='true']) {
    color: var(--tabs-darker);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid var(--tabs-main);
    outline-offset: 2px;
  }

  ${({ active, variant, anchor }) => {
    if (variant === 'line') {
      return `
        border-radius: 0;
        background: transparent;

        ${
          active
            ? `
          color: var(--tabs-main);
          ${lineActiveBorder(anchor)}
        `
            : ''
        }
      `;
    }

    if (variant === 'subtle') {
      return `
        border-radius: var(--tabs-radius);
        border-color: transparent;
        background: transparent;

        ${
          active
            ? `
          background-color: var(--tabs-subtle-bg);
          color: var(--tabs-darker);
        `
            : `
          &:hover:not(:disabled) {
            background-color: var(--tabs-subtle-bg-hover);
          }
        `
        }
      `;
    }

    if (variant === 'enclosed') {
      return `
        border-radius: var(--tabs-radius);
        border-color: transparent;
        background: transparent;

        ${
          active
            ? `
          background-color: var(--tabs-main);
          color: var(--tabs-contrast);
          border-color: var(--tabs-main);
        `
            : `
          &:hover:not(:disabled) {
            background-color: color-mix(in srgb, var(--tabs-main) 8%, transparent);
            color: var(--tabs-dark);
          }
        `
        }
      `;
    }

    if (variant === 'outline') {
      return `
        border-radius: var(--tabs-radius);
        background: transparent;

        ${
          active
            ? `
          color: var(--tabs-main);
          border-color: var(--tabs-main);
        `
            : `
          border-color: transparent;

          &:hover:not(:disabled) {
            color: var(--tabs-dark);
          }
        `
        }
      `;
    }

    return `
      border-radius: 0;
      border-color: transparent;
      background: transparent;
      padding-left: 0;
      padding-right: 0;

      ${
        active
          ? `
        color: var(--tabs-main);
      `
          : ''
      }
    `;
  }}
`;
