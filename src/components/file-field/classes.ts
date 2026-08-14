import { generateUtilityClasses } from '../../helpers/generate-utility-classes';

export const fileFieldClasses = generateUtilityClasses('FileField', [
  'root',
  'disabled',
  'error',
  'required',
]);
