import { HTMLAttributes, ReactNode } from 'react';

export type TEmptyMediaVariant = 'default' | 'icon';

export type TEmptyMediaProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  variant?: TEmptyMediaVariant;
};

export type TSEmptyMediaProps = {
  variant: TEmptyMediaVariant;
};
