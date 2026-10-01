import styled from '@emotion/styled';
import { sidebarItemIconClasses } from '../sidebar-item-icon/classes';
import { sidebarItemTrailingClasses } from '../sidebar-item-trailing/classes';
import { TSSidebarItemProps } from './types';
import { sidebarItemVariantStyles } from './variant-styles';

const customProps = new Set(['size', 'color', 'radius', 'variant']);

const trailing = `.${sidebarItemTrailingClasses.root}`;

export const SSidebarItem = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSSidebarItemProps>`
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  /* No row padding or gap: each slot pads itself off one item size, so
     every row (and every icon-only cell) has identical height and
     icons line up in a single column. */
  min-height: var(--sidebar-item-size);
  border-radius: ${({ theme, radius }) => theme.radius[radius]};
  color: ${({ theme }) => theme.surfaces.ink};
  transition:
    background-color 0.15s ease,
    color 0.15s ease;

  ${({ theme, size }) => {
    const step = theme.sizes[size];

    return `
      --sidebar-item-size: ${step.height};
      --sidebar-icon-size: ${step.icon};
      /* Glyph's distance from the cell edge, reused as content/trailing inset. */
      --sidebar-inset: calc((var(--sidebar-item-size) - var(--sidebar-icon-size)) / 2);
      --sidebar-content-pad-y: ${step.padY};
      --sidebar-title-size: ${step.fontSize};
      --sidebar-description-size: calc(${step.fontSize} * 0.85);
      --sidebar-trailing-gap: ${theme.spacing(theme.gap.xs)};
    `;
  }}

  &[data-icon-only] {
    width: var(--sidebar-item-size);
    height: var(--sidebar-item-size);
  }

  ${({ theme, variant, color }) =>
    sidebarItemVariantStyles(variant, theme, color)}

  &[data-disabled] {
    opacity: 0.45;
  }

  /* Hidden slots leave no gap (e.g. next to an always-on count). */
  ${trailing}:not([data-show-always]) {
    display: none;
  }

  &:hover ${trailing}[data-show-hover],
  &:focus-within ${trailing}[data-show-hover],
  &[data-active] ${trailing}[data-show-active] {
    display: flex;
  }

  /* No hover on touch screens, so hover-only content would be unreachable. */
  @media (hover: none) {
    ${trailing}[data-show-hover] {
      display: flex;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

// 'as' must be excluded too: a custom shouldForwardProp otherwise makes
// emotion treat `as` as a regular DOM attribute instead of a tag override.
const mainCustomProps = new Set(['as', 'color']);

// Not positioned itself, so its ::after stretches over the whole row and the
// row stays clickable end to end (trailing sits above it).
export const SSidebarItemMain = styled('button', {
  shouldForwardProp: (prop) => !mainCustomProps.has(prop),
})<Pick<TSSidebarItemProps, 'color'>>`
  display: flex;
  flex: 1 1 auto;
  align-self: stretch;
  align-items: center;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  font: inherit;
  color: inherit;
  text-align: left;
  cursor: pointer;
  outline: none;

  /* Rendered as a link: beat app/UA rules like "a:hover { text-decoration: underline }". */
  &,
  &:hover,
  &:focus,
  &:active,
  &:visited {
    color: inherit;
    text-decoration: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
  }

  &:focus-visible::after {
    outline: 2px solid
      ${({ color, theme }) =>
        color != null ? theme.palette[color].main : theme.surfaces.ink};
    outline-offset: -2px;
  }

  &:disabled,
  &[aria-disabled='true'] {
    cursor: not-allowed;
  }
`;

// Sits above the main element's stretched click overlay. Mirrors the icon
// cell's inset on the right.
export const SSidebarItemTrailingGroup = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: var(--sidebar-trailing-gap);
  margin-left: auto;
  padding-right: var(--sidebar-inset);
  pointer-events: none;
`;

export const SSidebarItemContent = styled.span`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  box-sizing: border-box;
  min-width: 0;
  padding: var(--sidebar-content-pad-y) var(--sidebar-inset);

  /* The icon cell's own inset already separates them. */
  .${sidebarItemIconClasses.root} + & {
    padding-left: 0;
  }

  /* Collapsed: keep title/description as the accessible name, hide visually. */
  [data-collapsed] & {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }
`;
