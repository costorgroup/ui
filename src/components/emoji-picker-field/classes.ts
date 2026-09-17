import { generateUtilityClasses } from '../../helpers/generate-utility-classes';

export const emojiPickerFieldClasses = generateUtilityClasses(
  'EmojiPickerField',
  ['root', 'disabled', 'error', 'required'],
);
