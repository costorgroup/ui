import { HTMLAttributes, ReactNode } from 'react';
import type { TFlexOwnProps } from '../../flex/types';

export type TCardFooterVariant = 'plain' | 'muted' | 'border';

export type TCardFooterProps = HTMLAttributes<HTMLDivElement> &
  Pick<TFlexOwnProps, 'align' | 'justify' | 'gap'> & {
    children?: ReactNode;
    variant?: TCardFooterVariant;
  };

export type TSCardFooterProps = {
  variant: TCardFooterVariant;
};
