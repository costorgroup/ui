import { HTMLAttributes, ReactNode } from 'react';

export type TSliderSlidesProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export type TSSliderSlidesProps = {
  translateX: number;
  transitionMs: number;
  disableTransition: boolean;
  isDraggable: boolean;
  dragging: boolean;
};
