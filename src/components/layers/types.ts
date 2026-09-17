import { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { TThemeRadius } from '../../theme/types';

export type TLayersRadius = keyof TThemeRadius;

export type TLayersSpread = 'top' | 'right' | 'bottom' | 'left';

export type TLayersProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  children?: ReactNode;
  radius?: TLayersRadius;
  aspectRatio?: CSSProperties['aspectRatio'];
  spread?: TLayersSpread;
};

export type TSLayersProps = {
  count: number;
  aspectRatio?: CSSProperties['aspectRatio'];
  spread: TLayersSpread;
};
