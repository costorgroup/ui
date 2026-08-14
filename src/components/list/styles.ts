import styled from '@emotion/styled';
import { TListSize, TSListItemsProps, TSListRootProps } from './types';

const rootCustomProps = new Set(['size', 'color']);
const itemsCustomProps = new Set(['listStyle', 'size', 'color']);

const itemFontSize: Record<TListSize, string> = {
  xs: '12px',
  sm: '13px',
  md: '14px',
  lg: '16px',
  xl: '18px',
};

export const SList = styled('div', {
  shouldForwardProp: (prop) => !rootCustomProps.has(prop),
})<TSListRootProps>`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  gap: ${({ theme, size = 'md' }) =>
    `calc(${theme.spacing(theme.gap.sm)} * ${theme.sizeScale[size]})`};
  font-family: inherit;
`;

export const SListHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const SListItems = styled('ul', {
  shouldForwardProp: (prop) => !itemsCustomProps.has(prop),
})<TSListItemsProps>`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: inherit;
  font-size: ${({ size = 'md' }) => itemFontSize[size]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  color: ${({ theme }) => theme.colors.default.main};

  & > li::marker {
    color: ${({ theme, color = 'primary' }) => theme.colors[color].main};
  }

  ${({ theme, listStyle, size = 'md' }) => {
    const scale = theme.sizeScale[size];
    const gap = `calc(${theme.spacing(theme.gap.xs)} * ${scale})`;
    const indent = `calc(${theme.spacing(theme.gap.lg)} * ${scale})`;

    switch (listStyle) {
      case 'ordered':
        return `
          list-style-type: decimal;
          list-style-position: outside;
          padding-left: ${indent};

          & > li + li {
            margin-top: ${gap};
          }
        `;
      case 'unordered':
        return `
          list-style-type: circle;
          list-style-position: outside;
          padding-left: ${indent};

          & > li + li {
            margin-top: ${gap};
          }
        `;
      case 'none':
      default:
        return `
          list-style-type: none;
          padding-left: 0;

          & > li + li {
            margin-top: ${gap};
          }
        `;
    }
  }}
`;
