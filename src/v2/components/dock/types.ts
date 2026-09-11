import { HTMLAttributes, ReactNode } from 'react';
import type { TAppearance } from '../../variant-types';

export type TDockAppearance = TAppearance;
export type TDockVariant = 'subtle' | 'surface' | 'plain';
export type TDockOrientation = 'horizontal' | 'vertical';

export type TDockProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  children?: ReactNode;
  orientation?: TDockOrientation;
  appearance?: TDockAppearance;
  /** `subtle` is fill only; `surface` adds a border; `plain` has no track. */
  variant?: TDockVariant;
};

export type TSDockProps = {
  orientation: TDockOrientation;
  appearance: TDockAppearance;
  variant: TDockVariant;
};
