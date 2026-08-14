import { ReactNode } from 'react';
import type { TPaletteColor } from '../../../theme/types';

export type TInputFileFieldModalProps = {
  files?: File[];
  accept?: string;
  disabled?: boolean;
  color?: TPaletteColor;
  title?: ReactNode;
  description?: ReactNode;
  onConfirm?: (files: File[]) => void;
  onCancel?: () => void;
};
