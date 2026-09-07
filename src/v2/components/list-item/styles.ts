import styled from '@emotion/styled';
import {
  listItemBackground,
  listItemColor,
  listItemDivider,
} from '../list/variant-styles';
import { TSListItemProps } from './types';

const customProps = new Set(['color', 'variant', 'size']);

export const SListItem = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSListItemProps>`
  min-width: 0;
  padding: ${({ theme, size }) => {
    const scale = theme.sizeScale[size];
    return `calc(${theme.spacing(theme.gap.sm)} * ${scale}) calc(${theme.spacing(theme.gap.md)} * ${scale})`;
  }};
  background-color: ${({ theme, variant, color }) =>
    listItemBackground(variant, theme.colors[color])};
  color: ${({ theme, variant, color }) =>
    listItemColor(variant, theme.colors[color], theme)};

  &:not(:last-child) {
    border-bottom: ${({ theme, variant, color }) =>
      listItemDivider(variant, theme.colors[color], theme)};
  }
`;
