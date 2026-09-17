import { ButtonHTMLAttributes, ReactNode } from 'react';

export type TInputSelectOptionProps<T = unknown> = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'value'
> & {
  children?: ReactNode;
  value?: T;
};
