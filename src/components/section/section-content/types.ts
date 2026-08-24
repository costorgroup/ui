import { HTMLAttributes, ReactNode } from 'react';
import { TSectionAlign, TSectionVariant } from '../section-group/context';

export type TSectionContentProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export type TSSectionContentProps = {
  align: TSectionAlign;
  variant: TSectionVariant;
};
