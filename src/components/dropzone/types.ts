import { HTMLAttributes, ReactNode } from 'react';
import type { TPaletteColor } from '../../theme/types';

export type TDropzoneProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'children'
> & {
  color?: TPaletteColor;
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  onFiles?: (files: File[]) => void;
  name?: string;
  inputProps?: Omit<
    HTMLAttributes<HTMLInputElement>,
    'type' | 'accept' | 'multiple' | 'disabled' | 'onChange'
  >;
};
