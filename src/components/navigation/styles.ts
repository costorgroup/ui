import styled from '@emotion/styled';
import {
  surfacePanelBackground,
  surfacePanelBorder,
  surfacePanelShadow,
} from '../../helpers/variant-styles/surface';
import { TNavigationSize, TSNavigationProps } from './types';

const customProps = new Set(['size', 'position']);

const sizeFont: Record<TNavigationSize, string> = {
  xs: '12px',
  sm: '13px',
  md: '14px',
  lg: '16px',
  xl: '18px',
};

const sizeLogoHeight: Record<TNavigationSize, string> = {
  xs: '1.25rem',
  sm: '1.5rem',
  md: '2rem',
  lg: '2.5rem',
  xl: '3rem',
};

export const SNavigation = styled('nav', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSNavigationProps>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-family: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  color: ${({ theme }) => theme.surfaces.ink};
  z-index: ${({ theme, position }) =>
    position === 'static' ? 'auto' : theme.zIndex.appBar};
  background-color: ${({ theme }) => surfacePanelBackground(theme)};
  border-bottom: ${({ theme }) => surfacePanelBorder(theme)};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;

  ${({ theme, size }) => {
    const scale = theme.sizeScale[size];

    return `
      font-size: ${sizeFont[size]};
      gap: calc(${theme.spacing(theme.gap.md)} * ${scale});
      padding: calc(${theme.spacing(theme.gap.sm)} * ${scale})
        calc(${theme.spacing(theme.gap.lg)} * ${scale});
      --navigation-gap: calc(${theme.spacing(theme.gap.md)} * ${scale});
      --navigation-logo-height: ${sizeLogoHeight[size]};
    `;
  }}

  ${({ theme, position }) => {
    switch (position) {
      case 'fixed':
        return `
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          box-shadow: ${surfacePanelShadow(theme)};
        `;
      case 'sticky':
        return `
          position: sticky;
          top: 0;
          box-shadow: ${surfacePanelShadow(theme)};
        `;
      case 'static':
      default:
        return `
          position: relative;
        `;
    }
  }}
`;
