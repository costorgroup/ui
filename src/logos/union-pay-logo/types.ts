import { SVGAttributes } from 'react';
import { TLogoVariant } from '../types';

export type TUnionPayLogoProps = Omit<
  SVGAttributes<SVGSVGElement>,
  'children'
> & {
  variant?: TLogoVariant;
};
