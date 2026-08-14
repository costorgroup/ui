import { generateUtilityClasses } from '../../helpers/generate-utility-classes';

export const textFieldClasses = generateUtilityClasses('TextField', [
  'root',
  'disabled',
  'error',
  'required',
]);
