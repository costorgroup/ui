import { SVGAttributes } from 'react';
import { TLogoVariant } from '../types';

export type TMastercardLogoProps = Omit<
  SVGAttributes<SVGSVGElement>,
  'children'
> & {
  variant?: TLogoVariant;
};
