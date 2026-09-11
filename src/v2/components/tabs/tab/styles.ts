import styled from '@emotion/styled';
import { colorMix } from '../../../surface';
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
  padding: 4px 14px;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.small};
  background: transparent;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.2;
  letter-spacing: -0.01em;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  color: ${({ active, color, theme, variant }) => {
    if (active) {
      return color != null
        ? theme.palette[color].contrastText
        : theme.palette.default.main;
    }

    if (variant === 'plain') {
      return colorMix(theme.palette.default.main, 55);
    }

    return theme.palette.default.main;
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

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid
      ${({ appearance, color, theme }) =>
        color != null
          ? theme.palette[color].main
          : appearance === 'transparent'
            ? theme.palette.default.main
            : theme.palette.base.main};
    outline-offset: 1px;
  }
`;
