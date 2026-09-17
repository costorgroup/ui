import styled from '@emotion/styled';
import { CUI_CANVAS_VAR } from '../../helpers/color/create-color-scale';
import { CHROME_IDLE } from '../../helpers/variant-styles';
import { colorMix } from '../../helpers/variant-styles/surface';
import { itemActionsClasses } from './item-actions/classes';
import { itemContentClasses } from './item-content/classes';
import { itemIconClasses } from './item-icon/classes';
import { TSItemProps } from './types';

const customProps = new Set(['radius', 'appearance', 'size', 'direction']);

export const SItem = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSItemProps>`
  display: flex;
  flex-direction: ${({ direction }) =>
    direction === 'vertical' ? 'column' : 'row'};
  align-items: ${({ direction }) =>
    direction === 'vertical' ? 'stretch' : 'center'};
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  border-radius: ${({ theme, radius }) => theme.radius[radius]};
  border: 1px solid ${({ theme }) => theme.surfaces.border};
  box-shadow: none;
  color: ${({ theme }) => theme.surfaces.ink};

  ${({ theme, size }) => {
    const step = theme.sizes[size];

    return `
      --item-icon-size: calc(${step.height} * 1.75);
      --item-icon-glyph: ${step.icon};
      --item-title-size: ${step.fontSize};
      --item-description-size: calc(${step.fontSize} * 0.9);
      --item-content-gap: ${theme.spacing(theme.gap.xs)};
      --item-actions-gap: ${step.gap};
      gap: ${step.gap};
      padding: ${step.padX};
    `;
  }}

  ${({ theme, appearance }) =>
    appearance === 'opaque'
      ? `
          ${CUI_CANVAS_VAR}: ${theme.surfaces.background};
          background-color: ${theme.surfaces.background};
        `
      : `
          ${CUI_CANVAS_VAR}: transparent;
          background-color: ${colorMix(theme.surfaces.mixer, CHROME_IDLE)};
        `}

  ${({ direction }) =>
    direction === 'vertical'
      ? `
          .${itemIconClasses.root} {
            align-self: flex-start;
          }

          .${itemContentClasses.root} {
            width: 100%;
          }

          .${itemActionsClasses.root} {
            width: 100%;
            margin-left: 0;
            justify-content: flex-end;
          }
        `
      : ''}
`;
