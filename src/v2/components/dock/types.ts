import { HTMLAttributes, ReactNode } from 'react';
import type { TAppearance } from '../../variant-types';
import type { TButtonSize } from '../button/types';

export type TDockAppearance = TAppearance;
export type TDockVariant = 'subtle' | 'surface' | 'plain';
export type TDockOrientation = 'horizontal' | 'vertical';
export type TDockSize = TButtonSize;

export type TDockProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  children?: ReactNode;
  orientation?: TDockOrientation;
  appearance?: TDockAppearance;
  /** `subtle` is fill only; `surface` adds a border; `plain` has no track. */
  variant?: TDockVariant;
  size?: TDockSize;
};

export type TSDockProps = {
  orientation: TDockOrientation;
  appearance: TDockAppearance;
  variant: TDockVariant;
  size: TDockSize;
};
