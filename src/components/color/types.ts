import { ButtonHTMLAttributes } from 'react';

export type TColorSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** CSS color value (hex, rgb, hsl, named color, etc.). */
export type TColorValue = string;

export type TColorProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'color'
> & {
  colors?: TColorValue | TColorValue[];
  size?: TColorSize;
  selected?: boolean;
};

export type TSColorProps = {
  size: TColorSize;
  colors: TColorValue[];
};
