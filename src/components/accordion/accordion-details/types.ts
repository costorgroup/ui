import { HTMLAttributes, ReactNode } from 'react';
import { TAccordionSize } from '../accordion-base/context';

export type TAccordionDetailsProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export type TSAccordionDetailsProps = {
  expanded: boolean;
};

export type TSAccordionDetailsInnerProps = {
  size: TAccordionSize;
};
