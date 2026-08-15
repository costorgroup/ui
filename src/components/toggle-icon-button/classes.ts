import { generateUtilityClasses } from '../../helpers/generate-utility-classes';

export const toggleIconButtonClasses = generateUtilityClasses(
  'ToggleIconButton',
  ['root', 'disabled', 'active', 'focusVisible'],
);
