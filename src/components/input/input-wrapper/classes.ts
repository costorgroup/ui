import { generateUtilityClasses } from '../../../helpers/generate-utility-classes';

export const inputWrapperClasses = generateUtilityClasses('InputWrapper', [
  'root',
  'body',
  'actionBar',
  'disabled',
  'error',
  'focused',
  'readOnly',
]);
