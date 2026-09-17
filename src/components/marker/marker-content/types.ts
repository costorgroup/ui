import { HTMLAttributes, ReactNode } from 'react';

export type TMarkerContentProps = HTMLAttributes<HTMLSpanElement> & {
  children?: ReactNode;
};
