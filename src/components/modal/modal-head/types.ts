import { HTMLAttributes, ReactNode } from 'react';

export type TModalHeadProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  onClose?: () => void;
};
