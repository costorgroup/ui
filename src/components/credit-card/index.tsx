import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { CreditCardBrandMark } from './brands';
import { creditCardClasses } from './classes';
import {
  detectCreditCardBrand,
  formatCardNumber,
  formatCvv,
  formatExpiry,
} from './detect';
import {
  SCreditCard,
  SCreditCardBackMeta,
  SCreditCardBrand,
  SCreditCardChip,
  SCreditCardContactless,
  SCreditCardCvv,
  SCreditCardFace,
  SCreditCardField,
  SCreditCardHead,
  SCreditCardLabel,
  SCreditCardMeta,
  SCreditCardNumber,
  SCreditCardPanel,
  SCreditCardRow,
  SCreditCardScene,
  SCreditCardSignature,
  SCreditCardStripe,
  SCreditCardValue,
} from './styles';
import { TCreditCardProps } from './types';

const ContactlessIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M8.5 8.2c1.7 1.7 1.7 5.9 0 7.6M12 6c2.8 2.8 2.8 9.2 0 12M15.5 3.8c3.8 3.8 3.8 12.6 0 16.4"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const CreditCard = forwardRef<HTMLDivElement, TCreditCardProps>(
  (
    {
      number = '',
      name = '',
      expiry = '',
      cvv = '',
      brand: brandProp,
      color = 'primary',
      rotate = false,
      className,
      ...props
    },
    ref,
  ) => {
    const brand = brandProp ?? detectCreditCardBrand(number);
    const displayName = name.trim() || 'Cardholder name';

    return (
      <SCreditCard
        ref={ref}
        rotate={rotate}
        {...props}
        className={mergeClasses(
          creditCardClasses.root,
          rotate && creditCardClasses.rotated,
          className,
        )}
      >
        <SCreditCardScene rotate={rotate} className={creditCardClasses.scene}>
          <SCreditCardFace
            brand={brand}
            color={color}
            data-side="front"
            className={mergeClasses(creditCardClasses.face, creditCardClasses.front)}
          >
            <SCreditCardHead>
              <SCreditCardRow>
                <SCreditCardChip className={creditCardClasses.chip} />
                <SCreditCardContactless className={creditCardClasses.contactless}>
                  <ContactlessIcon />
                </SCreditCardContactless>
              </SCreditCardRow>
              <SCreditCardBrand className={creditCardClasses.brand}>
                <CreditCardBrandMark brand={brand} />
              </SCreditCardBrand>
            </SCreditCardHead>
            <SCreditCardNumber className={creditCardClasses.number}>
              {formatCardNumber(number, brand)}
            </SCreditCardNumber>
            <SCreditCardMeta>
              <SCreditCardField>
                <SCreditCardLabel>Card holder</SCreditCardLabel>
                <SCreditCardValue className={creditCardClasses.name}>
                  {displayName}
                </SCreditCardValue>
              </SCreditCardField>
              <SCreditCardField>
                <SCreditCardLabel>Valid thru</SCreditCardLabel>
                <SCreditCardValue className={creditCardClasses.expiry}>
                  {formatExpiry(expiry)}
                </SCreditCardValue>
              </SCreditCardField>
            </SCreditCardMeta>
          </SCreditCardFace>
          <SCreditCardFace
            brand={brand}
            color={color}
            data-side="back"
            className={mergeClasses(creditCardClasses.face, creditCardClasses.back)}
          >
            <SCreditCardStripe className={creditCardClasses.stripe} />
            <SCreditCardPanel>
              <SCreditCardSignature className={creditCardClasses.signature} />
              <SCreditCardCvv className={creditCardClasses.cvv}>
                {formatCvv(cvv, brand)}
              </SCreditCardCvv>
            </SCreditCardPanel>
            <SCreditCardBackMeta>
              <SCreditCardField>
                <SCreditCardLabel>Authorized signature</SCreditCardLabel>
                <SCreditCardValue>{displayName}</SCreditCardValue>
              </SCreditCardField>
              <SCreditCardBrand className={creditCardClasses.brand}>
                <CreditCardBrandMark brand={brand} />
              </SCreditCardBrand>
            </SCreditCardBackMeta>
          </SCreditCardFace>
        </SCreditCardScene>
      </SCreditCard>
    );
  },
);

CreditCard.displayName = 'CreditCard';

export type { TCreditCardProps, TCreditCardBrand } from './types';
export { creditCardClasses } from './classes';
export {
  detectCreditCardBrand,
  formatCardNumber,
  formatCvv,
  formatExpiry,
  CARD_NUMBER_GROUPS,
  CARD_CVV_LENGTH,
  digitsOnly,
} from './detect';
export { CreditCard };
export default CreditCard;
