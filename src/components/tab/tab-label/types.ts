import { HTMLAttributes, ReactNode } from 'react';

export type TTabLabelProps = HTMLAttributes<HTMLSpanElement> & {
  children?: ReactNode;
};
