import { CSSProperties, HTMLAttributes, ReactNode } from 'react';

export type TInputDirection = 'vertical' | 'horizontal' | 'horizontal-reverse';

export type TInputFieldDirection =
  | 'vertical'
  | 'ltr'
  | 'ltr-alt'
  | 'rtl'
  | 'rtl-alt';

export type TInputControlDirection = Exclude<TInputFieldDirection, 'vertical'>;

export type TInputBaseProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  direction?: TInputDirection;
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  fullWidth?: boolean;
};
