import { HTMLAttributes } from 'react';
import { TDockOrientation } from '../types';

export type TDockSeparatorProps = HTMLAttributes<HTMLSpanElement>;

export type TSDockSeparatorProps = {
  orientation: TDockOrientation;
};
