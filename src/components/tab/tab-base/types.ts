import { ButtonHTMLAttributes, ReactNode } from 'react';

export type TTabBaseProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
  children?: ReactNode;
  active?: boolean;
};
