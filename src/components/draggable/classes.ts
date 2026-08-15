import { generateUtilityClasses } from '../../helpers/generate-utility-classes';

export const draggableClasses = generateUtilityClasses('Draggable', [
  'root',
  'ghost',
  'dragging',
]);
