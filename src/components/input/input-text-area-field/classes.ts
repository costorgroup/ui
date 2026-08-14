import { generateUtilityClasses } from '../../../helpers/generate-utility-classes';

export const inputTextAreaFieldClasses = generateUtilityClasses(
  'InputTextAreaField',
  ['root', 'disabled', 'error', 'readOnly', 'required'],
);
