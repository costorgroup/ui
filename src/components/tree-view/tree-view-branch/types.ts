import { HTMLAttributes, ReactNode } from 'react';

export type TTreeViewBranchProps = HTMLAttributes<HTMLUListElement> & {
  children?: ReactNode;
};
