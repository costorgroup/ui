import { HTMLAttributes, ReactNode } from 'react';

export type TWindowHeaderProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  onClose?: () => void;
};
