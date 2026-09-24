import styled from '@emotion/styled';
import { accordionShellVariantStyles } from '../variant-styles';
import { TSAccordionBaseProps } from './types';

const rootCustomProps = new Set([
  'radius',
  'size',
  'expanded',
  'disabled',
  'color',
  'variant',
  'grouped',
  'colorScope',
  'forceContrastText',
]);

export const SAccordionBase = styled('div', {
  shouldForwardProp: (prop) => !rootCustomProps.has(prop),
})<TSAccordionBaseProps>`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  ${({ theme, radius, variant, grouped, colorScope }) =>
    grouped || variant === 'plain' || colorScope === 'summary'
      ? ''
      : `border-radius: ${theme.radius[radius]};`}
  ${({ theme, color, variant, grouped, colorScope, forceContrastText }) =>
    accordionShellVariantStyles(variant, theme.palette[color], theme, {
      grouped,
      colorScope,
      forceContrastText,
    })}
  font-family: inherit;
  font-size: ${({ theme, size }) => theme.sizes[size].fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  transition: background-color 0.12s ease, border-color 0.12s ease;
  opacity: ${({ disabled }) => (disabled ? 0.55 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;
