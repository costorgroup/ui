import { generateUtilityClasses } from '../../../helpers/generate-utility-classes';

export const creditCardClasses = generateUtilityClasses('CreditCard', [
  'root',
  'scene',
  'face',
  'front',
  'back',
  'chip',
  'contactless',
  'number',
  'name',
  'expiry',
  'brand',
  'stripe',
  'signature',
  'cvv',
  'rotated',
]);
