import { ReactNode } from 'react';
import type { TPaletteColor } from '../../../theme/types';
import type { TInputVariant } from '../input-wrapper/types';

export type TInputFileFieldModalProps = {
  files?: File[];
  accept?: string;
  disabled?: boolean;
  color?: TPaletteColor;
  variant?: TInputVariant;
  title?: ReactNode;
  description?: ReactNode;
  onConfirm?: (files: File[]) => void;
  onCancel?: () => void;
  className?: string;
};
