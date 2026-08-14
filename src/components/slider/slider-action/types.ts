import { ReactNode } from 'react';
import { TIconButtonProps } from '../../icon-button/types';

export type TSliderActionDirection = 'prev' | 'next';

export type TSliderActionProps = Omit<TIconButtonProps, 'children'> & {
  direction?: TSliderActionDirection;
  children?: ReactNode;
};
