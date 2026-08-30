import { ReactNode } from 'react';
import type { TFlipbookBaseProps, TFlipbookHandle } from './flipbook-base/types';

export type { TFlipbookHandle };

export type TFlipbookProps = Omit<TFlipbookBaseProps, 'children'> & {
  children?: ReactNode;
  /** PDF (or image list) document URL. When set, children are ignored. */
  src?: string;
  /** pdf.js worker URL. Defaults to a CDN build matching the installed pdfjs-dist. */
  workerSrc?: string;
  /** Render scale for PDF pages (device pixels). */
  pdfScale?: number;
};
