import { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { TThemeRadius } from '../../theme/types';
import type { TSlotProps } from '../../helpers/slot-props';

export type TLayersRadius = keyof TThemeRadius;

export type TLayersSpread = 'top' | 'right' | 'bottom' | 'left';

export type TLayersSlotProps = TSlotProps<{
  scene: HTMLAttributes<HTMLDivElement>;
}>;

export type TLayersProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  children?: ReactNode;
  radius?: TLayersRadius;
  aspectRatio?: CSSProperties['aspectRatio'];
  spread?: TLayersSpread;
  slotProps?: TLayersSlotProps;
};

export type TSLayersProps = {
  count: number;
  aspectRatio?: CSSProperties['aspectRatio'];
  spread: TLayersSpread;
};
