import { generateUtilityClasses } from '../../../helpers/generate-utility-classes';

export const dragItemClasses = generateUtilityClasses('DragItem', [
  'root',
  'ghost',
  'dragging',
]);
