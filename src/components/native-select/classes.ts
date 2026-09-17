import { generateUtilityClasses } from '../../helpers/generate-utility-classes';

export const nativeSelectClasses = generateUtilityClasses('NativeSelect', [
  'root',
  'field',
  'error',
  'required',
  'disabled',
]);
