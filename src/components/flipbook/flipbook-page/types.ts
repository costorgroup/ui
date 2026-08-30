import { HTMLAttributes, ReactNode } from 'react';

export type TFlipbookPageProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  children?: ReactNode;
  hard?: boolean;
};
