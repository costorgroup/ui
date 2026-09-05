import styled from '@emotion/styled';
import { STabProps } from './types';

const customProps = new Set([
  'active',
  'appearance',
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
  min-width: 0;
  margin: 0;
  padding: 4px 14px;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.small};
  background: transparent;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.2;
  letter-spacing: -0.01em;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  color: ${({ active, color, theme }) => {
    if (active) {
      return color != null
        ? theme.colors[color].contrastText
        : theme.colors.base.main;
    }

    return theme.colors.default.fg;
  }};
  cursor: ${({ selected, draggable, dragging }) => {
    if (!draggable || !selected) {
      return 'pointer';
    }

    return dragging ? 'grabbing' : 'grab';
  }};
  user-select: none;
  transition: color 0.15s ease;
  flex: ${({ fullWidth, orientation }) =>
    fullWidth ? '1 1 0' : '0 0 auto'};
  ${({ orientation, fullWidth }) =>
    orientation === 'vertical' && fullWidth ? 'width: 100%;' : ''}

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid
      ${({ appearance, color, theme }) =>
        color != null
          ? theme.colors[color].main
          : appearance === 'transparent'
            ? theme.colors.base.contrastText
            : theme.colors.base.main};
    outline-offset: 1px;
  }
`;
