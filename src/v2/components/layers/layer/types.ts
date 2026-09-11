import { HTMLAttributes, ReactNode } from 'react';
import { TLayersRadius, TLayersSpread } from '../types';

export type TLayerProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  children?: ReactNode;
  radius?: TLayersRadius;
  /** Injected by `Layers`. */
  index?: number;
};

export type TSLayerProps = {
  radius: TLayersRadius;
  index: number;
  count: number;
  spread: TLayersSpread;
};
