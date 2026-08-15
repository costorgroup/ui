import { generateUtilityClasses } from '../../../helpers/generate-utility-classes';

export const treeViewItemClasses = generateUtilityClasses('TreeViewItem', [
  'root',
  'content',
  'selected',
  'expanded',
  'disabled',
]);
