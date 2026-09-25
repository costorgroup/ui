import { ReactNode } from 'react';
import type { AnyExtension, Editor } from '@tiptap/react';
import type { TPaletteColor } from '../../theme/types';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';
import type { TFieldSlotProps } from '../form-control/types';
import type { TInputRichTextFieldSlotProps } from '../input/input-rich-text-field/types';

export type TRichTextFieldSlotProps = TFieldSlotProps<
  Required<TInputRichTextFieldSlotProps>
>;

export type TRichTextFieldProps = {
  label?: ReactNode;
  description?: ReactNode;
  helperText?: ReactNode;
  required?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  size?: TInputSize;
  variant?: TInputVariant;
  color?: TPaletteColor;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onEditorReady?: (editor: Editor) => void;
  placeholder?: string;
  disabled?: boolean;
  editable?: boolean;
  showToolbar?: boolean;
  toolbar?: ReactNode;
  extensions?: AnyExtension[];
  rows?: number;
  minHeight?: number | string;
  id?: string;
  name?: string;
  className?: string;
  actionBar?: ReactNode;
  slotProps?: TRichTextFieldSlotProps;
};
