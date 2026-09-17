import { HTMLAttributes } from 'react';

export type TQrCodeProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  value: string;
};
