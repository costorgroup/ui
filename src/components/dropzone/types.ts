import { HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import type { TGap, TPaletteColor } from '../../theme/types';
import type { TInputVariant } from '../input/input-wrapper/types';
import type { TSlotProps } from '../../helpers/slot-props';
import type { TButtonProps } from '../button/types';

export type TDropzoneSize = 'sm' | 'md' | 'lg';

/** Theme gap key, spacing units (number), or any CSS length. */
export type TDropzoneSpacing = TGap | number | (string & {});

export type TDropzonePreviewContext = {
  files: File[];
  /** Object URLs for `files`, same order. Created and revoked by Dropzone. */
  urls: string[];
  reupload: () => void;
  remove: () => void;
};

export type TDropzoneSlotProps = TSlotProps<{
  input: InputHTMLAttributes<HTMLInputElement>;
  preview: HTMLAttributes<HTMLDivElement>;
  overlay: HTMLAttributes<HTMLDivElement>;
  actions: HTMLAttributes<HTMLDivElement>;
  reuploadButton: TButtonProps;
  removeButton: TButtonProps;
  icon: HTMLAttributes<HTMLSpanElement>;
  title: HTMLAttributes<HTMLDivElement>;
  description: HTMLAttributes<HTMLDivElement>;
}>;

export type TDropzoneProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'children'
> & {
  color?: TPaletteColor;
  variant?: TInputVariant;
  size?: TDropzoneSize;
  /** Overrides the size-based padding. */
  padding?: TDropzoneSpacing;
  /** Overrides the size-based gap between icon, title and description. */
  gap?: TDropzoneSpacing;
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  /** Allowed formats: MIME types (`image/png`), wildcards (`image/*`) or
   * extensions (`.pdf`). Also enforced on drop. */
  accept?: string | string[];
  multiple?: boolean;
  disabled?: boolean;
  /** Controlled files. */
  files?: File[];
  defaultFiles?: File[];
  /** Called with accepted files after a drop or selection. */
  onFiles?: (files: File[]) => void;
  /** Called with files that didn't match `accept`. */
  onReject?: (files: File[]) => void;
  /** Called when the preview's remove action is used. */
  onRemove?: () => void;
  /** Renders selected files in place of the empty state. On hover a scrim
   * offers reupload / remove, and dropping new files replaces them. */
  renderPreview?: (context: TDropzonePreviewContext) => ReactNode;
  reuploadLabel?: ReactNode;
  removeLabel?: ReactNode;
  dropLabel?: ReactNode;
  name?: string;
  inputProps?: Omit<
    HTMLAttributes<HTMLInputElement>,
    'type' | 'accept' | 'multiple' | 'disabled' | 'onChange'
  >;
  slotProps?: TDropzoneSlotProps;
};
