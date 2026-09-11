import styled from '@emotion/styled';
import { TSSectionContentProps } from './types';

const customProps = new Set(['align', 'variant']);

const railPad = `calc(
  var(--section-marker-size, 0.625rem) +
    var(--section-rail-gap, 0.5rem)
)`;

export const SSectionContent = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSSectionContentProps>`
  box-sizing: border-box;
  color: ${({ theme }) => theme.palette.base.main};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  min-width: 0;

  ${({ align, variant }) => {
    if (align === 'center' || variant === 'none') {
      return `
        text-align: ${align === 'center' ? 'center' : align === 'right' ? 'right' : 'left'};
        padding-inline: 0;
      `;
    }

    if (align === 'right') {
      return `
        text-align: right;
        padding-right: ${railPad};
      `;
    }

    return `
      text-align: left;
      padding-left: ${railPad};
    `;
  }}
`;
