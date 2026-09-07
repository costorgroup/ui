import { generateUtilityClasses } from '../../../helpers/generate-utility-classes';

export const actionFieldClasses = generateUtilityClasses('ActionField', [
  'root',
  'actions',
  'disabled',
  'error',
  'required',
]);
