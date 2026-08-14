import styled from '@emotion/styled';
import { inputWrapperClasses } from '../input/input-wrapper/classes';
import { tableBaseClasses } from '../table/table-base/classes';
import { dataTableClasses } from './classes';
import { TSDataTableProps } from './types';

const customProps = new Set(['color', 'variant']);

export const SDataTableToolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(theme.gap.md)};
`;

export const SDataTableHeader = styled.div`
  display: flex;
  flex: 1 1 12rem;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(theme.gap.xs)};
  min-width: 0;
`;

export const SDataTableSearch = styled.div`
  flex: 0 1 16rem;
  min-width: 12rem;
  max-width: 20rem;
  margin-left: auto;
`;

export const SDataTableScroll = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const SDataTableFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(theme.gap.md)};
`;

export const SDataTableEntries = styled.div`
  flex: 1 1 auto;
  min-width: 0;
`;

export const SDataTable = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSDataTableProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(theme.gap.md)};
  width: 100%;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.large};
  font-family: inherit;

  ${({ theme }) => {
    const pad = theme.spacing(theme.gap.lg);

    return `
      padding: ${pad};
    `;
  }}

  ${({ theme, variant, color }) => {
    const palette = theme.colors[color];
    const black = theme.colors.common.black;
    const white = theme.colors.common.white;
    const shadow = `
      box-shadow:
        0 4px 10px ${black}0a,
        0 1px 4px ${black}08,
        0 1px 2px ${black}05;
    `;

    switch (variant) {
      case 'solid':
        return `
          background-color: ${palette.main};
          color: ${palette.contrastText};
          border-color: ${palette.main};
          ${shadow}

          & .${tableBaseClasses.root} {
            --table-fg: ${palette.contrastText};
            --table-head-fg: ${palette.contrastText};
            --table-border: color-mix(in srgb, ${palette.contrastText} 28%, transparent);
            --table-head-bg: color-mix(in srgb, ${palette.contrastText} 12%, transparent);
            --table-row-hover: color-mix(in srgb, ${palette.contrastText} 10%, transparent);
            --table-accent: ${palette.contrastText};
          }

          & .${dataTableClasses.search} .${inputWrapperClasses.root} {
            background-color: ${white};
            color: ${theme.colors.default.darker};
            border-color: transparent;

            &:hover,
            &:focus-within {
              background-color: ${white};
              color: ${theme.colors.default.darker};
              border-color: transparent;
            }
          }
        `;
      case 'surface':
        return `
          background-color: color-mix(in srgb, ${palette.lighter} 88%, transparent);
          color: ${palette.darker};
          border-color: color-mix(in srgb, ${palette.main} 24%, transparent);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          ${shadow}
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${palette.darker};
          border-color: ${palette.main};
        `;
      case 'ghost':
        return `
          background-color: transparent;
          color: ${palette.darker};
          border-color: transparent;
        `;
      case 'plain':
        return `
          background-color: transparent;
          color: ${palette.darker};
          border-color: transparent;
          padding-left: 0;
          padding-right: 0;
        `;
      case 'subtle':
      default:
        return `
          background-color: color-mix(in srgb, ${palette.main} 6%, transparent);
          color: ${palette.darker};
          border-color: transparent;
          ${shadow}
        `;
    }
  }}
`;
