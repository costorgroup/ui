import { HTMLAttributes, ReactNode } from 'react';

export type TItemDescriptionProps = HTMLAttributes<HTMLParagraphElement> & {
  children?: ReactNode;
};
