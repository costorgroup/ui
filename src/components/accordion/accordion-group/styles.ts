import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';
import { DragGroup } from '../../drag';
import { accordionDivider, accordionTint } from '../variant-styles';
import { TSAccordionGroupAddProps, TSAccordionGroupProps } from './types';

const customProps = new Set(['radius']);
const addCustomProps = new Set(['paletteColor', 'size', 'appearance']);

/** One outlined box: the items, then the empty state and add row. Every
 * part after the first gets a divider on top. */
export const SAccordionGroup = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSAccordionGroupProps>`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  border: ${({ theme }) => accordionDivider(theme)};
  border-radius: ${({ theme, radius }) => theme.radius[radius]};
  overflow: hidden;

  & > * + * {
    border-top: ${({ theme }) => accordionDivider(theme)};
  }
`;

const listStyles = ({ theme }: { theme: Theme }) => css`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > [data-accordion-grouped] + [data-accordion-grouped] {
    border-top: ${accordionDivider(theme)};
  }
`;

export const SAccordionGroupList = styled.div(listStyles);

/** Same list as a drag group; items drag by their summary's grip. */
export const SAccordionGroupDragList = styled(DragGroup)(listStyles);

export const SAccordionGroupEmpty = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.surfaces.muted};
  font-size: 0.875em;
  text-align: center;

  strong {
    color: ${({ theme }) => theme.surfaces.ink};
  }
`;

export const SAccordionGroupAdd = styled('button', {
  shouldForwardProp: (prop) => !addCustomProps.has(prop),
})<TSAccordionGroupAddProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: ${({ theme, size }) => `calc(48px * ${theme.sizeScale[size]})`};
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  color: ${({ theme, paletteColor }) => theme.palette[paletteColor].main};
  font-size: ${({ theme, size }) => theme.sizes[size].icon};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme, paletteColor, appearance }) =>
      accordionTint(theme.palette[paletteColor].main, 10, theme, appearance)};
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme, paletteColor }) => theme.palette[paletteColor].main};
    outline-offset: -2px;
  }
`;

export const SAccordionGroupAddIcon = styled.svg`
  width: 1em;
  height: 1em;
`;
