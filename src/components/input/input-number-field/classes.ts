import { generateUtilityClasses } from '../../../helpers/generate-utility-classes';

export const inputNumberFieldClasses = generateUtilityClasses(
  'InputNumberField',
  ['root', 'disabled', 'error', 'readOnly', 'required'],
);
