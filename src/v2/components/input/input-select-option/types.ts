import { ButtonHTMLAttributes, ReactNode } from 'react';

export type TInputSelectOptionProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> & {
  children?: ReactNode;
  value?: string | number;
};
