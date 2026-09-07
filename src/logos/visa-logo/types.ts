import { SVGAttributes } from 'react';
import { TLogoVariant } from '../types';

export type TVisaLogoProps = Omit<SVGAttributes<SVGSVGElement>, 'children'> & {
  variant?: TLogoVariant;
};
