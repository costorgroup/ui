import { TPaletteColor } from '../../../../theme/types';
import type { TButtonVariant } from '../../button/types';
import {
  PAGINATION_INACTIVE_COLOR,
  TPaginationVariantProp,
} from '../types';

export const normalizePaginationVariants = (
  variant: TPaginationVariantProp,
) => {
  if (Array.isArray(variant)) {
    return {
      activeVariant: variant[0],
      inactiveVariant: variant[1],
    };
  }

  return {
    activeVariant: variant,
    inactiveVariant: variant,
  };
};

export const resolvePaginationItemAppearance = (
  selected: boolean,
  variant: TPaginationVariantProp,
  color: TPaletteColor,
) => {
  const { activeVariant, inactiveVariant } = normalizePaginationVariants(variant);

  return {
    variant: selected ? activeVariant : inactiveVariant,
    color: selected ? color : PAGINATION_INACTIVE_COLOR,
  };
};
