import { HTMLAttributes, ReactNode } from 'react';

export type TCardActionsJustify = 'start' | 'end' | 'space-between';

export type TCardActionsProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  justify?: TCardActionsJustify;
};
