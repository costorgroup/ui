import { HTMLAttributes, ReactNode } from 'react';

export type TCardFooterVariant = 'plain' | 'muted' | 'border';

export type TCardFooterProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  variant?: TCardFooterVariant;
};

export type TSCardFooterProps = {
  variant: TCardFooterVariant;
};
