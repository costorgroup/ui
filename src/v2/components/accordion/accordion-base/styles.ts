import styled from '@emotion/styled';
import { accordionShellVariantStyles } from '../variant-styles';
import { TAccordionSize } from './context';
import { TSAccordionBaseProps } from './types';

const rootCustomProps = new Set([
  'radius',
  'size',
  'expanded',
  'disabled',
  'color',
  'variant',
  'grouped',
]);

const sizeFont: Record<TAccordionSize, string> = {
  xs: '12px',
  sm: '13px',
  md: '14px',
  lg: '16px',
  xl: '18px',
};

export const SAccordionBase = styled('div', {
  shouldForwardProp: (prop) => !rootCustomProps.has(prop),
})<TSAccordionBaseProps>`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  ${({ theme, radius, grouped }) =>
    grouped ? '' : `border-radius: ${theme.radius[radius]};`}
  ${({ theme, color, variant, expanded, grouped }) => {
    const palette = theme.palette[color];
    return accordionShellVariantStyles(variant, palette, theme, {
      expanded,
      grouped,
    });
  }}
  font-family: inherit;
  font-size: ${({ size }) => sizeFont[size]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  transition: background-color 0.12s ease, border-color 0.12s ease;
  opacity: ${({ disabled }) => (disabled ? 0.55 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;
