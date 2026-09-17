import { generateUtilityClasses } from '../../helpers/generate-utility-classes';

export const formControlClasses = generateUtilityClasses('V2FormControl', [
  'root',
  'disabled',
  'error',
  'required',
  'focused',
  'filled',
  'fullWidth',
]);
