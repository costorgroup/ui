import styled from '@emotion/styled';
import { TAspectRatioOwnProps } from './types';

type TSAspectRatioProps = Pick<
  TAspectRatioOwnProps,
  'ratio' | 'maxWidth' | 'maxHeight'
>;

const customProps = new Set(['ratio', 'maxWidth', 'maxHeight']);

const toCssSize = (value?: number | string) => {
  if (value === undefined) {
    return undefined;
  }

  return typeof value === 'number' ? `${value}px` : value;
};

const resolveMaxWidth = (
  ratio: number,
  maxWidth?: number | string,
  maxHeight?: number | string,
) => {
  const limits: string[] = [];
  const widthLimit = toCssSize(maxWidth);
  const heightLimit = toCssSize(maxHeight);

  if (widthLimit) {
    limits.push(widthLimit);
  }

  if (heightLimit) {
    limits.push(`calc(${heightLimit} * ${ratio})`);
  }

  if (limits.length === 0) {
    return '100%';
  }

  if (limits.length === 1) {
    return limits[0];
  }

  return `min(${limits.join(', ')})`;
};

export const SAspectRatio = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSAspectRatioProps>`
  position: relative;
  box-sizing: border-box;
  display: block;
  width: 100%;
  max-width: ${({ ratio = 4 / 3, maxWidth, maxHeight }) =>
    resolveMaxWidth(ratio, maxWidth, maxHeight)};
  max-height: ${({ maxHeight }) => toCssSize(maxHeight) ?? 'none'};
  aspect-ratio: ${({ ratio = 4 / 3 }) => ratio};
  overflow: hidden;

  & > *:not(style) {
    overflow: hidden;
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  & > img,
  & > video {
    object-fit: cover;
  }
`;
