import { TextareaHTMLAttributes } from 'react';

export type TInputTextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  autoGrow?: boolean;
};
