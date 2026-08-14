import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TInputSize } from '../input-wrapper/types';

export type { TInputSize };

export type TInputHelperTextProps = HTMLAttributes<HTMLParagraphElement> & {
  children?: ReactNode;
  color?: TPaletteColor;
  size?: TInputSize;
};
