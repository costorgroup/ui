import { generateUtilityClasses } from '../../helpers/generate-utility-classes';

export const videoClasses = generateUtilityClasses('Video', [
  'root',
  'media',
  'overlay',
  'controls',
  'progress',
  'played',
  'bar',
  'time',
  'volume',
  'volumeTrack',
  'volumeFill',
]);
