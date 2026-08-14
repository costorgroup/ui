import React, { ReactNode, forwardRef } from 'react';
import { useTheme } from '@emotion/react';
import { SInputBase } from './styles';
import {
  TInputControlDirection,
  TInputFieldDirection,
  TInputBaseProps,
} from './types';

const InputBase = forwardRef<HTMLDivElement, TInputBaseProps>(
  (
    {
      children,
      direction = 'vertical',
      justify,
      align,
      fullWidth = false,
      ...props
    },
    ref,
  ) => {
    return (
      <SInputBase
        ref={ref}
        direction={direction}
        justify={justify}
        align={align}
        fullWidth={fullWidth}
        {...props}
      >
        {children}
      </SInputBase>
    );
  },
);

InputBase.displayName = 'InputBase';

const CONTROL_LAYOUT: Record<
  TInputControlDirection,
  {
    inputFirst: boolean;
    justify: 'flex-start' | 'flex-end' | 'space-between';
    textAlign: 'left' | 'right';
  }
> = {
  ltr: {
    inputFirst: true,
    justify: 'flex-start',
    textAlign: 'left',
  },
  'ltr-alt': {
    inputFirst: true,
    justify: 'space-between',
    textAlign: 'right',
  },
  rtl: {
    inputFirst: false,
    justify: 'flex-end',
    textAlign: 'right',
  },
  'rtl-alt': {
    inputFirst: false,
    justify: 'space-between',
    textAlign: 'left',
  },
};

export type TInputFieldLayoutProps = Omit<
  TInputBaseProps,
  'children' | 'direction' | 'justify'
> & {
  direction?: TInputFieldDirection;
  label?: ReactNode;
  description?: ReactNode;
  helperText?: ReactNode;
  children?: ReactNode;
};

const InputFieldLayout = forwardRef<HTMLDivElement, TInputFieldLayoutProps>(
  (
    {
      children,
      label,
      description,
      helperText,
      direction = 'vertical',
      align,
      fullWidth = true,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();
    const isVertical = direction === 'vertical';
    const hasHeader =
      label != null || description != null || helperText != null;

    if (isVertical) {
      return (
        <InputBase
          ref={ref}
          fullWidth={fullWidth}
          direction="vertical"
          align={align}
          {...props}
        >
          {label}
          {description}
          {children}
          {helperText}
        </InputBase>
      );
    }

    const layout = CONTROL_LAYOUT[direction];
    const spaced = layout.justify === 'space-between';

    const header = hasHeader ? (
      <InputBase
        direction="vertical"
        style={{
          textAlign: layout.textAlign,
          flex: spaced ? 1 : undefined,
          flexShrink: spaced ? undefined : 0,
          minWidth: 0,
          alignItems: layout.textAlign === 'right' ? 'flex-end' : 'flex-start',
        }}
      >
        {label}
        {description}
        {helperText}
      </InputBase>
    ) : null;

    const field = (
      <InputBase
        direction="vertical"
        style={{
          flexShrink: 0,
          flexGrow: 0,
          width: 'auto',
        }}
      >
        {children}
      </InputBase>
    );

    return (
      <InputBase
        ref={ref}
        fullWidth={fullWidth}
        direction="horizontal"
        justify={layout.justify}
        align={align ?? 'flex-start'}
        style={{ gap: theme.spacing(3) }}
        {...props}
      >
        {layout.inputFirst ? (
          <>
            {field}
            {header}
          </>
        ) : (
          <>
            {header}
            {field}
          </>
        )}
      </InputBase>
    );
  },
);

InputFieldLayout.displayName = 'InputFieldLayout';

export type {
  TInputBaseProps,
  TInputDirection,
  TInputFieldDirection,
  TInputControlDirection,
} from './types';
export { InputBase, InputFieldLayout };
export default InputBase;
