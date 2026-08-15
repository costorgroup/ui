import { generateUtilityClasses } from '../../helpers/generate-utility-classes';

export const ratingClasses = generateUtilityClasses('Rating', [
  'root',
  'item',
  'label',
  'icon',
  'iconEmpty',
  'iconFilled',
  'visuallyHidden',
  'disabled',
  'readOnly',
  'focusVisible',
]);
