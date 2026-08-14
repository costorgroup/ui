import { ReactNode, Ref } from 'react';
import type {
  TSliderHandle,
  TSliderBaseProps,
} from './slider-base/types';

export type { TSliderHandle };

export type TSliderProps = Omit<TSliderBaseProps, 'children' | 'sliderRef'> & {
  children?: ReactNode;
  content?: ReactNode;
  showActions?: boolean;
  showPagination?: boolean;
  sliderRef?: Ref<TSliderHandle>;
};
