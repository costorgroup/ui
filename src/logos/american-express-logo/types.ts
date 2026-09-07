import { SVGAttributes } from 'react';
import { TLogoVariant } from '../types';

export type TAmericanExpressLogoProps = Omit<
  SVGAttributes<SVGSVGElement>,
  'children'
> & {
  variant?: TLogoVariant;
};
