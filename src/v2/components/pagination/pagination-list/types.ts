import { HTMLAttributes, ReactNode } from 'react';

export type TPaginationListProps = HTMLAttributes<HTMLUListElement> & {
  children?: ReactNode;
};
