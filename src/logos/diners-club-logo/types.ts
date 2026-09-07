import { SVGAttributes } from 'react';
import { TLogoVariant } from '../types';

export type TDinersClubLogoProps = Omit<
  SVGAttributes<SVGSVGElement>,
  'children'
> & {
  variant?: TLogoVariant;
};
