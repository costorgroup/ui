import { generateUtilityClasses } from '../../../helpers/generate-utility-classes';

export const inputWrapperClasses = generateUtilityClasses('InputWrapper', [
  'root',
  'disabled',
  'error',
  'focused',
  'readOnly',
]);
