import { HTMLAttributes } from 'react';
import { TDockOrientation, TDockSize } from '../types';

export type TDockSeparatorProps = HTMLAttributes<HTMLSpanElement>;

export type TSDockSeparatorProps = {
  orientation: TDockOrientation;
  size: TDockSize;
};
