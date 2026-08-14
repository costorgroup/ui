import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { inputHelperTextClasses } from './classes';
import { SInputHelperText } from './styles';
import { TInputHelperTextProps } from './types';

const InputHelperText = forwardRef<HTMLParagraphElement, TInputHelperTextProps>(
  (
    {
      children,
      color = 'default',
      size = 'sm',
      error = false,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <SInputHelperText
        ref={ref}
        color={error ? 'error' : color}
        size={size}
        {...props}
        className={mergeClasses(
          inputHelperTextClasses.root,
          error && inputHelperTextClasses.error,
          className,
        )}
      >
        {children}
      </SInputHelperText>
    );
  },
);

InputHelperText.displayName = 'InputHelperText';

export { inputHelperTextClasses } from './classes';
export { InputHelperText };
export default InputHelperText;
