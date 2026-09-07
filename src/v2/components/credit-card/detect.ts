import { TCreditCardBrand } from './types';

export const CARD_NUMBER_GROUPS: Record<TCreditCardBrand, number[]> = {
  visa: [4, 4, 4, 4],
  mastercard: [4, 4, 4, 4],
  amex: [4, 6, 5],
  discover: [4, 4, 4, 4],
  diners: [4, 6, 4],
  jcb: [4, 4, 4, 4],
  unionpay: [4, 4, 4, 4],
  maestro: [4, 4, 4, 4],
  mir: [4, 4, 4, 4],
  unknown: [4, 4, 4, 4],
};

export const CARD_CVV_LENGTH: Record<TCreditCardBrand, number> = {
  visa: 3,
  mastercard: 3,
  amex: 4,
  discover: 3,
  diners: 3,
  jcb: 3,
  unionpay: 3,
  maestro: 3,
  mir: 3,
  unknown: 3,
};

export const digitsOnly = (value: string) => value.replace(/\D/g, '');

export const detectCreditCardBrand = (number: string): TCreditCardBrand => {
  const n = digitsOnly(number);

  if (n.length === 0) {
    return 'unknown';
  }

  if (/^3[47]/.test(n)) {
    return 'amex';
  }

  if (/^220[0-4]/.test(n)) {
    return 'mir';
  }

  const prefix2 = Number(n.slice(0, 2));
  const prefix4 = Number(n.slice(0, 4));

  if (n.length >= 4 && prefix4 >= 2221 && prefix4 <= 2720) {
    return 'mastercard';
  }

  if (prefix2 >= 51 && prefix2 <= 55) {
    return 'mastercard';
  }

  if (n.startsWith('4')) {
    return 'visa';
  }

  if (
    n.startsWith('6011') ||
    n.startsWith('65') ||
    (n.length >= 3 &&
      Number(n.slice(0, 3)) >= 644 &&
      Number(n.slice(0, 3)) <= 649) ||
    (n.length >= 6 &&
      Number(n.slice(0, 6)) >= 622126 &&
      Number(n.slice(0, 6)) <= 622925)
  ) {
    return 'discover';
  }

  if (n.length >= 4 && prefix4 >= 3528 && prefix4 <= 3589) {
    return 'jcb';
  }

  if (/^3(?:0[0-5]|09|[689])/.test(n)) {
    return 'diners';
  }

  if (/^(5018|5020|5038|5893|6304|6759|6761|6762|6763)/.test(n)) {
    return 'maestro';
  }

  if (n.startsWith('62')) {
    return 'unionpay';
  }

  return 'unknown';
};

export const formatCardNumber = (number: string, brand: TCreditCardBrand) => {
  const groups = CARD_NUMBER_GROUPS[brand];
  const total = groups.reduce((sum, size) => sum + size, 0);
  const padded = digitsOnly(number).slice(0, total).padEnd(total, '•');
  let cursor = 0;

  return groups
    .map((size) => {
      const part = padded.slice(cursor, cursor + size);
      cursor += size;
      return part;
    })
    .join('  ');
};

export const formatExpiry = (expiry: string) => {
  const digits = digitsOnly(expiry).slice(0, 4).padEnd(4, '•');
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

export const formatCvv = (cvv: string, brand: TCreditCardBrand) => {
  const length = CARD_CVV_LENGTH[brand];
  return digitsOnly(cvv).slice(0, length).padEnd(length, '•');
};
