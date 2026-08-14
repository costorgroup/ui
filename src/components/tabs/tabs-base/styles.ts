import styled from '@emotion/styled';
import {
  TTabsAnchor,
  TTabsJustify,
  TSTabsBaseProps,
} from './types';

const customProps = new Set(['color', 'variant', 'anchor', 'justify']);

const isVertical = (anchor: TTabsAnchor) =>
  anchor === 'left' || anchor === 'right';

const justifyMap: Record<TTabsJustify, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
};

export const STabsBase = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSTabsBaseProps>`
  display: flex;
  flex-direction: ${({ anchor }) => (isVertical(anchor) ? 'column' : 'row')};
  ${({ anchor, justify }) => {
    const vertical = isVertical(anchor);

    if (vertical) {
      return `
        align-items: ${justifyMap[justify]};
        justify-content: flex-start;
      `;
    }

    return `
      justify-content: ${justify === 'stretch' ? 'flex-start' : justifyMap[justify]};
      align-items: ${justify === 'stretch' ? 'stretch' : 'center'};
    `;
  }}
  gap: ${({ theme, variant }) =>
    variant === 'enclosed' ||
    variant === 'subtle' ||
    variant === 'outline' ||
    variant === 'plain'
      ? theme.spacing(theme.gap.xs)
      : '0'};
  font-family: inherit;

  ${({ theme, color, variant, anchor }) => {
    const palette = theme.colors[color];
    const track = theme.colors.default.lighter;
    const lineWidth = '2px';

    const vars = `
      --tabs-main: ${palette.main};
      --tabs-dark: ${palette.dark};
      --tabs-darker: ${palette.darker};
      --tabs-contrast: ${palette.contrastText};
      --tabs-muted: ${theme.colors.default.light};
      --tabs-track: ${track};
      --tabs-subtle-bg: color-mix(in srgb, ${palette.main} 8%, transparent);
      --tabs-subtle-bg-hover: color-mix(in srgb, ${palette.main} 14%, transparent);
      --tabs-radius: ${theme.radius.medium};
    `;

    if (variant === 'line') {
      const lineStyles: Record<TTabsAnchor, string> = {
        bottom: `
          border-bottom: ${lineWidth} solid var(--tabs-track);
        `,
        top: `
          border-top: ${lineWidth} solid var(--tabs-track);
        `,
        left: `
          border-left: ${lineWidth} solid var(--tabs-track);
        `,
        right: `
          border-right: ${lineWidth} solid var(--tabs-track);
        `,
      };

      return `
        ${vars}
        ${lineStyles[anchor]}
      `;
    }

    if (variant === 'enclosed') {
      return `
        ${vars}
        padding: ${theme.spacing(theme.gap.xs)};
        background-color: ${theme.colors.default.lighter};
        border-radius: ${theme.radius.large};
      `;
    }

    return vars;
  }}

  ${({ anchor, justify }) =>
    justify === 'stretch' && !isVertical(anchor)
      ? `
    & > * {
      flex: 1 1 0;
    }
  `
      : ''}
`;
