import { ReactNode } from 'react';
import type { TTabBaseProps } from './tab-base/types';

export type TTabProps = Omit<TTabBaseProps, 'children'> & {
  children?: ReactNode;
  icon?: ReactNode;
};
