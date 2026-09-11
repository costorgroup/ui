import { HTMLAttributes, ReactNode } from 'react';

export type TModalDescriptionProps = HTMLAttributes<HTMLParagraphElement> & {
  children?: ReactNode;
};
