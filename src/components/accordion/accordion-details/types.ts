import { HTMLAttributes, ReactNode } from 'react';

export type TAccordionDetailsProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export type TSAccordionDetailsProps = {
  expanded: boolean;
};
