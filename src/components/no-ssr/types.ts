import { ReactNode } from 'react';

export type TNoSsrProps = {
  children?: ReactNode;
  defer?: boolean;
  fallback?: ReactNode;
};
