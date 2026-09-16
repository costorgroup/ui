import styled from '@emotion/styled';
import { colorMix } from '../../surface';
import { markerContentClasses } from './marker-content/classes';
import { TSMarkerProps } from './types';

const customProps = new Set(['variant', 'color']);

export const SMarker = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSMarkerProps>`
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  min-height: 1rem;
  margin: 0;
  padding: 0;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  border: 0;
  background: none;
  font-family: inherit;
  font-size: ${({ theme }) => theme.sizes.md.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  text-align: left;
  color: ${({ theme, color }) =>
    color === 'default' ? theme.surfaces.muted : theme.palette[color].main};

  ${({ theme, color, variant }) => {
    const line =
      color === 'default'
        ? theme.surfaces.divider
        : colorMix(theme.palette[color].main, 30);

    if (variant === 'separator') {
      return `
        &::before,
        &::after {
          content: '';
          flex: 1 1 auto;
          min-width: 0;
          height: 1px;
          background-color: ${line};
        }

        &::before {
          margin-right: ${theme.spacing(theme.gap.xs)};
        }

        &::after {
          margin-left: ${theme.spacing(theme.gap.xs)};
        }

        .${markerContentClasses.root} {
          flex: none;
          text-align: center;
        }
      `;
    }

    if (variant === 'border') {
      return `
        padding-bottom: ${theme.spacing(theme.gap.sm)};
        border-bottom: 1px solid ${line};
      `;
    }

    return '';
  }}

  svg {
    display: block;
    width: 1em;
    height: 1em;
  }

  a {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }

  a:hover {
    color: ${({ theme, color }) =>
      color === 'default' ? theme.surfaces.ink : theme.palette[color].dark};
  }

  &[href],
  button& {
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }

  &[href]:hover,
  button&:hover {
    color: ${({ theme, color }) =>
      color === 'default' ? theme.surfaces.ink : theme.palette[color].dark};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme, color }) =>
      color === 'default' ? theme.surfaces.ink : theme.palette[color].main};
    outline-offset: 2px;
    border-radius: ${({ theme }) => theme.radius.sm};
  }
`;
