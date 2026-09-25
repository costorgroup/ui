import { InputHTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TInputSize, TInputVariant } from '../input-wrapper/types';
import type { TInputWrapperProps } from '../input-wrapper/types';
import type { TInputActionsProps } from '../input-actions/types';
import type { TInputButtonProps } from '../input-button/types';
import type { TInputIconProps } from '../input-icon/types';
import type { TSlotProps } from '../../../helpers/slot-props';

export type TInputNumberFieldSlotProps = TSlotProps<{
  wrapper: TInputWrapperProps;
  startIcon: TInputIconProps;
  endIcon: TInputIconProps;
  actions: TInputActionsProps;
  incrementButton: TInputButtonProps;
  decrementButton: TInputButtonProps;
}>;

export type TInputNumberFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'type'
> & {
  size?: TInputSize;
  variant?: TInputVariant;
  color?: TPaletteColor;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  spinner?: boolean;
  step?: number;
  min?: number;
  max?: number;
  actionBar?: ReactNode;
  slotProps?: TInputNumberFieldSlotProps;
};
