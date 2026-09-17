import { HTMLAttributes, ReactNode } from 'react';

export type TEmptyDescriptionProps = HTMLAttributes<HTMLParagraphElement> & {
  children?: ReactNode;
};
