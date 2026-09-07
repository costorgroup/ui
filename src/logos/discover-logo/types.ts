import { SVGAttributes } from 'react';
import { TLogoVariant } from '../types';

export type TDiscoverLogoProps = Omit<SVGAttributes<SVGSVGElement>, 'children'> & {
  variant?: TLogoVariant;
};
