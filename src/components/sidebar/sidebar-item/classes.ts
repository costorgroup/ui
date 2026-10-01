import { generateUtilityClasses } from '../../../helpers/generate-utility-classes';

export const sidebarItemClasses = generateUtilityClasses('SidebarItem', [
  'root',
  'main',
  'content',
  'active',
  'disabled',
  'iconOnly',
  'trailing',
]);
