import { HTMLAttributes, ReactNode } from 'react';
import type { TPaletteColor } from '../../../theme/types';
import type { TScrollAreaMode } from '../../scroll-area/types';

export type TModalBodyProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  scrollable?: boolean;
  mode?: TScrollAreaMode;
  color?: TPaletteColor;
};
