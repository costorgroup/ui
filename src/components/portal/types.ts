import { ReactNode } from 'react';

export type TPortalProps = {
  children?: ReactNode;
  container?: Element | DocumentFragment | null;
  disabled?: boolean;
};
