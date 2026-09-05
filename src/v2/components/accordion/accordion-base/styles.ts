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
  ${({ theme, color, variant }) => {
    const palette = theme.colors[color];
    return accordionShellVariantStyles(variant, palette, theme);
  }}
  font-family: inherit;
  font-size: ${({ size }) => sizeFont[size]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  opacity: ${({ disabled }) => (disabled ? 0.55 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  [data-accordion-grouped] + & {
    margin-top: -1px;
    border-top: none;
  }
`;
