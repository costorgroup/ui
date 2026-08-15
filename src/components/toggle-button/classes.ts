import { generateUtilityClasses } from '../../helpers/generate-utility-classes';

export const toggleButtonClasses = generateUtilityClasses('ToggleButton', [
  'root',
  'disabled',
  'active',
  'focusVisible',
]);
