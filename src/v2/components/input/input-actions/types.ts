import { HTMLAttributes, ReactNode } from 'react';

export const INPUT_ACTIONS_ORIENTATIONS = ['horizontal', 'vertical'] as const;

export type TInputActionsOrientation =
  (typeof INPUT_ACTIONS_ORIENTATIONS)[number];

export type TInputActionsProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  orientation?: TInputActionsOrientation;
};
