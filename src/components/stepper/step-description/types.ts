import { HTMLAttributes, ReactNode } from 'react';

export type TStepDescriptionProps = HTMLAttributes<HTMLParagraphElement> & {
  children?: ReactNode;
};
