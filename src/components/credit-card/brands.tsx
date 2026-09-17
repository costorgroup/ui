import React from 'react';
import {
  AmericanExpressLogo,
  DinersClubLogo,
  DiscoverLogo,
  JcbLogo,
  MaestroLogo,
  MastercardLogo,
  UnionPayLogo,
  VisaLogo,
} from '../../logos';
import { TCreditCardBrand } from './types';

const markProps = {
  width: '100%',
  height: '100%',
  preserveAspectRatio: 'xMaxYMin meet',
} as const;

const Mark = ({ children }: { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 72 28"
    fill="none"
    aria-hidden
    {...markProps}
  >
    {children}
  </svg>
);

export const CreditCardBrandMark = ({ brand }: { brand: TCreditCardBrand }) => {
  if (brand === 'visa') {
    return <VisaLogo {...markProps} />;
  }

  if (brand === 'mastercard') {
    return <MastercardLogo {...markProps} />;
  }

  if (brand === 'amex') {
    return <AmericanExpressLogo color="currentColor" {...markProps} />;
  }

  if (brand === 'discover') {
    return <DiscoverLogo color="currentColor" {...markProps} />;
  }

  if (brand === 'diners') {
    return <DinersClubLogo color="currentColor" {...markProps} />;
  }

  if (brand === 'jcb') {
    return <JcbLogo {...markProps} />;
  }

  if (brand === 'unionpay') {
    return <UnionPayLogo {...markProps} />;
  }

  if (brand === 'maestro') {
    return <MaestroLogo color="currentColor" {...markProps} />;
  }

  if (brand === 'mir') {
    return (
      <Mark>
        <text
          x="72"
          y="20"
          textAnchor="end"
          fill="currentColor"
          fontFamily="Arial, sans-serif"
          fontSize="16"
          fontWeight="800"
        >
          MIR
        </text>
      </Mark>
    );
  }

  return (
    <Mark>
      <rect
        x="36"
        y="6"
        width="36"
        height="16"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </Mark>
  );
};
