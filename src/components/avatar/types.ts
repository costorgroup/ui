import { HTMLAttributes, ImgHTMLAttributes, ReactNode } from 'react';
import { TThemeRadius } from '../../theme/types';
import type { TSlotProps } from '../../helpers/slot-props';

export type TAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TAvatarRadius = keyof TThemeRadius;

export type TAvatarSlotProps = TSlotProps<{
  img: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;
}>;

export type TAvatarProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'children'
> & {
  name?: string;
  src?: string | null;
  alt?: string;
  size?: TAvatarSize;
  radius?: TAvatarRadius;
  children?: ReactNode;
  imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;
  slotProps?: TAvatarSlotProps;
};

export type TSAvatarProps = {
  size: TAvatarSize;
  radius: TAvatarRadius;
};
