import { generateUtilityClasses } from '../../../helpers/generate-utility-classes';

export const inputTextFieldClasses = generateUtilityClasses('InputTextField', [
  'root',
  'disabled',
  'error',
  'readOnly',
  'required',
]);
