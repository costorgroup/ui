import styled from '@emotion/styled';
import { STabProps } from './types';

const customProps = new Set([
  'active',
  'appearance',
  'variant',
  'orientation',
  'fullWidth',
  'draggable',
  'dragging',
  'selected',
  'color',
]);

export const STab = styled('button', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<STabProps>`
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin: 0;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: transparent;
  font-family: inherit;
  line-height: 1.2;
  letter-spacing: -0.01em;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  color: ${({ active, color, theme, variant }) => {
    if (active) {
      return color != null
        ? theme.palette[color].contrastText
        : theme.surfaces.background;
    }

    if (variant === 'plain') {
      return theme.surfaces.muted;
    }

    return theme.surfaces.ink;
  }};
  cursor: ${({ selected, draggable, dragging }) => {
    if (!draggable || !selected) {
      return 'pointer';
    }

    return dragging ? 'grabbing' : 'grab';
  }};
  user-select: none;
  transition: color 0.15s ease;
  flex: ${({ fullWidth }) => (fullWidth ? '1 0 auto' : '0 0 auto')};
  ${({ orientation, fullWidth }) =>
    orientation === 'vertical' && fullWidth ? 'width: 100%;' : ''}

  ${({ theme }) => {
    const step = theme.sizes.md;

    return `
      padding: ${step.padY} ${step.padX};
      font-size: ${step.fontSize};
    `;
  }}

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid
      ${({ color, theme }) =>
        color != null ? theme.palette[color].main : theme.surfaces.ink};
    outline-offset: 1px;
  }
`;
