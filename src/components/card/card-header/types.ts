import { HTMLAttributes, ReactNode } from 'react';

export type TCardHeaderVariant = 'plain' | 'muted' | 'border';

export type TCardHeaderProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  variant?: TCardHeaderVariant;
};

export type TSCardHeaderProps = {
  variant: TCardHeaderVariant;
};
