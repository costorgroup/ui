import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor, TThemeRadius } from '../../../../theme/types';

export type TAlertVariant = 'solid' | 'subtle' | 'surface';
export type TAlertSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TAlertRadius = keyof TThemeRadius;

export type TAlertBaseProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'title'
> & {
  children?: ReactNode;
  color?: TPaletteColor;
  variant?: TAlertVariant;
  size?: TAlertSize;
  radius?: TAlertRadius;
  closable?: boolean;
};

export type TSAlertBaseProps = {
  color: TPaletteColor;
  variant: TAlertVariant;
  size: TAlertSize;
  radius: TAlertRadius;
  closable: boolean;
};
