import { LiHTMLAttributes, ReactNode } from 'react';

export type TListItemProps = LiHTMLAttributes<HTMLLIElement> & {
  children?: ReactNode;
};
