import { LabelHTMLAttributes, ReactNode } from 'react';
import { TInputSize } from '../input-wrapper/types';

export type { TInputSize };

export type TInputLabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children?: ReactNode;
  required?: boolean;
  error?: boolean;
  disabled?: boolean;
  size?: TInputSize;
};
