import { HTMLAttributes, ReactNode } from 'react';

export type TDrawerDescriptionProps = HTMLAttributes<HTMLParagraphElement> & {
  children?: ReactNode;
};
