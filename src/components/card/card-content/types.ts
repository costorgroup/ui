import { ReactNode } from 'react';
import type { TScrollAreaProps } from '../../scroll-area/types';

export type TCardContentProps = TScrollAreaProps & {
  children?: ReactNode;
};
