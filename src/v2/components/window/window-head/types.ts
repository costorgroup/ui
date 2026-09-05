import { HTMLAttributes, ReactNode } from 'react';

export type TWindowHeadProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  onClose?: () => void;
};
