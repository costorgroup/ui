import { SVGAttributes } from 'react';
import { TLogoVariant } from '../types';

export type TJcbLogoProps = Omit<SVGAttributes<SVGSVGElement>, 'children'> & {
  variant?: TLogoVariant;
};
