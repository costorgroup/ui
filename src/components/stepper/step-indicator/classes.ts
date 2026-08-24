import { generateUtilityClasses } from '../../../helpers/generate-utility-classes';

export const stepIndicatorClasses = generateUtilityClasses('StepIndicator', [
  'root',
  'complete',
  'active',
  'incomplete',
  'error',
]);
