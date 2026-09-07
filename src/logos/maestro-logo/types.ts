import { SVGAttributes } from 'react';
import { TLogoVariant } from '../types';

export type TMaestroLogoProps = Omit<
  SVGAttributes<SVGSVGElement>,
  'children'
> & {
  variant?: TLogoVariant;
};
