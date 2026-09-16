import { HTMLAttributes, ReactNode } from 'react';

export type TCardDescriptionProps = HTMLAttributes<HTMLParagraphElement> & {
  children?: ReactNode;
};
