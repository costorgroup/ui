import '@emotion/react';
import { TTheme } from './types';

declare module '@emotion/react' {
  export interface Theme extends TTheme {}
}
