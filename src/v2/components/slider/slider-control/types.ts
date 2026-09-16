import { ReactNode } from 'react';
import { TIconButtonProps } from '../../icon-button/types';

export type TSliderControlDirection = 'prev' | 'next';

export type TSliderControlProps = Omit<TIconButtonProps, 'children'> & {
  direction?: TSliderControlDirection;
  children?: ReactNode;
};

export type TSSliderControlOriginProps = {
  origin: TSliderControlDirection;
};
