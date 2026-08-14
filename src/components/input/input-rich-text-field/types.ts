import { ReactNode } from 'react';
import type { AnyExtension, Editor } from '@tiptap/react';
import type { TPaletteColor } from '../../../theme/types';
import type { TInputSize, TInputVariant } from '../input-wrapper/types';

export type TInputRichTextFieldProps = {
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
  variant?: TInputVariant;
  size?: TInputSize;
  color?: TPaletteColor;
  id?: string;
  name?: string;
  'aria-invalid'?: boolean | 'true' | 'false';
  'aria-label'?: string;
  className?: string;
};
