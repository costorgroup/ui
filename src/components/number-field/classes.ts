import { generateUtilityClasses } from '../../helpers/generate-utility-classes';

export const numberFieldClasses = generateUtilityClasses('NumberField', [
  'root',
  'disabled',
  'error',
  'required',
]);
