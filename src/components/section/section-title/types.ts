import type { TPolymorphicPropsWithRef } from '../../../helpers/polymorphic';
import { TSectionAlign, TSectionVariant } from '../section-group/context';

export type TSectionTitleAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span';

export type TSectionTitleOwnProps = {
  children?: React.ReactNode;
  /** When false, only the label is rendered (marker is composed elsewhere). */
  showMarker?: boolean;
};

export type TSectionTitleProps<C extends TSectionTitleAs = 'h3'> =
  TPolymorphicPropsWithRef<C, TSectionTitleOwnProps>;

export type TSSectionTitleProps = {
  align: TSectionAlign;
  variant: TSectionVariant;
};
