import { HTMLAttributes } from 'react';
import { TPaletteColor } from '../../theme/types';

export type TQrCodeProps = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color'> & {
  value: string;
  color?: TPaletteColor;
};
