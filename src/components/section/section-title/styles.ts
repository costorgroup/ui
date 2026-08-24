import styled from '@emotion/styled';
import { TSSectionTitleProps } from './types';

const customProps = new Set(['align', 'variant']);

const railPad = `calc(
  var(--section-marker-size, 0.625rem) +
    var(--section-rail-gap, 0.5rem)
)`;

export const SSectionTitle = styled('h3', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSSectionTitleProps>`
  margin: 0;
  display: flex;
  align-items: center;
  gap: var(--section-rail-gap, ${({ theme }) => theme.spacing(theme.gap.sm)});
  position: relative;
  z-index: 1;
  font-family: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeight.heading};
  font-size: ${({ theme }) => theme.typography.heading.h3};
  color: ${({ theme }) => theme.colors.default.main};
  box-sizing: border-box;

  ${({ align, variant }) => {
    if (align === 'center') {
      return `
        flex-direction: column;
        justify-content: center;
        text-align: center;
      `;
    }

    /* Line: reserve the same rail space as a marker, without drawing one. */
    const linePad =
      variant === 'line'
        ? align === 'right'
          ? `padding-right: ${railPad};`
          : `padding-left: ${railPad};`
        : '';

    if (align === 'right') {
      return `
        flex-direction: row-reverse;
        justify-content: flex-start;
        ${linePad}
      `;
    }

    return `
      flex-direction: row;
      justify-content: flex-start;
      ${linePad}
    `;
  }}
`;

/** Path node. Halo ring is toggled by SectionGroup `variant`. */
export const SSectionTitleMarker = styled.span`
  position: relative;
  display: block;
  flex-shrink: 0;
  width: var(--section-marker-size, 0.625rem);
  height: var(--section-marker-size, 0.625rem);
  border-radius: 50%;
  background-color: var(--section-path-color, currentColor);
  box-sizing: border-box;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    border-radius: 50%;
    background-color: color-mix(
      in srgb,
      var(--section-path-color, currentColor) 50%,
      transparent
    );
    transform: translate(-50%, -50%);
    z-index: -1;
    pointer-events: none;
  }
`;

export const SSectionTitleLabel = styled.span`
  min-width: 0;
`;
