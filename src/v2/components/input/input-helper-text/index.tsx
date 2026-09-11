import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { useFormControlState } from '../../form-control/context';
import { inputHelperTextClasses } from './classes';
import { SInputHelperText } from './styles';
import { TInputHelperTextProps } from './types';

const InputHelperText = forwardRef<HTMLParagraphElement, TInputHelperTextProps>(
  (
    {
      children,
      color,
      size: sizeProp,
      error: errorProp,
      id,
      className,
      ...props
    },
    ref,
  ) => {
    const form = useFormControlState({
      error: errorProp,
      size: sizeProp,
    });
    const error = form.error || color === 'error';

    return (
      <SInputHelperText
        ref={ref}
        id={id ?? form.helperId}
        error={error}
        size={form.size}
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
