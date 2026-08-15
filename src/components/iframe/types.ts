import { IframeHTMLAttributes, ReactNode } from 'react';

export type TIframeProps = Omit<IframeHTMLAttributes<HTMLIFrameElement>, 'children'> & {
  children?: ReactNode;
};
