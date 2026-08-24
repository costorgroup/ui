import { generateUtilityClasses } from '../../../helpers/generate-utility-classes';

export const stepClasses = generateUtilityClasses('Step', [
  'root',
  'main',
  'labels',
  'horizontal',
  'vertical',
  'alternativeLabel',
  'completed',
  'active',
  'error',
  'disabled',
]);
