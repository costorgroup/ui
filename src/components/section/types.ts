import { HTMLAttributes, ReactNode } from 'react';
import type { TSlotProps } from '../../helpers/slot-props';
import type { TSectionContentProps } from './section-content/types';

export type TSectionSlotProps = TSlotProps<{
  title: Omit<HTMLAttributes<HTMLHeadingElement>, 'color'>;
  content: TSectionContentProps;
}>;

export type TSectionProps = Omit<HTMLAttributes<HTMLElement>, 'color' | 'title'> & {
  children?: ReactNode;
  title?: ReactNode;
  slotProps?: TSectionSlotProps;
};
