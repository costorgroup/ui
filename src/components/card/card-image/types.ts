import { ReactNode } from 'react';
import { TImageProps } from '../../image/types';

export type TCardImageProps = TImageProps & {
  children?: ReactNode;
};
