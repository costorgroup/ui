import { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TInputSize, TInputVariant } from '../input-wrapper/types';

export type TRangeValue = number | [number, number];
export type TRangeDirection = 'horizontal' | 'vertical';
export type TRangeValuePosition = 'top' | 'bottom' | 'left' | 'right';
export type TRangeTrack = 'normal' | 'inverted' | false;
export type TRangeThumb = 'single' | 'from' | 'to';

export type TRangeRenderValueProps = {
  value: number;
  thumb: TRangeThumb;
  formatted: string;
};

export type TRangeRenderValue = (props: TRangeRenderValueProps) => ReactNode;

export type TInputRangeFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'type' | 'value' | 'defaultValue' | 'onChange'
> & {
  size?: TInputSize;
  variant?: TInputVariant;
  color?: TPaletteColor;
  multi?: boolean;
  direction?: TRangeDirection;
  valuePosition?: TRangeValuePosition;
  track?: TRangeTrack;
  renderValue?: TRangeRenderValue;
  min?: number;
  max?: number;
  step?: number;
  value?: TRangeValue;
  defaultValue?: TRangeValue;
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: TRangeValue) => void;
};
