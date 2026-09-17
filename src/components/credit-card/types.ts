import { HTMLAttributes } from 'react';
import { TPaletteColor } from '../../theme/types';

export type TCreditCardBrand =
  | 'visa'
  | 'mastercard'
  | 'amex'
  | 'discover'
  | 'diners'
  | 'jcb'
  | 'unionpay'
  | 'maestro'
  | 'mir'
  | 'unknown';

export type TCreditCardProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color'
> & {
  number?: string;
  name?: string;
  expiry?: string;
  cvv?: string;
  brand?: TCreditCardBrand;
  color?: TPaletteColor;
  rotate?: boolean;
};

export type TSCreditCardProps = {
  rotate: boolean;
};

export type TSCreditCardFaceProps = {
  brand: TCreditCardBrand;
  color: TPaletteColor;
};
