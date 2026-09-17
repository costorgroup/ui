import React, { ReactElement, Ref, forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { toHtmlValue } from '../../form-control/value';
import { inputSelectOptionClasses } from './classes';
import { SInputSelectOption } from '../input-select/styles';
import { TInputSelectOptionProps } from './types';

const InputSelectOptionInner = <T,>(
  { children, type = 'button', className, value, ...props }: TInputSelectOptionProps<T>,
  ref: Ref<HTMLButtonElement>,
) => {
  const htmlValue = toHtmlValue(value);

  return (
    <SInputSelectOption
      ref={ref}
      type={type}
      role="option"
      {...props}
      value={htmlValue}
      className={mergeClasses(inputSelectOptionClasses.root, className)}
    >
      {children}
    </SInputSelectOption>
  );
};

const InputSelectOption = forwardRef(InputSelectOptionInner) as <T = unknown>(
  props: TInputSelectOptionProps<T> & { ref?: Ref<HTMLButtonElement> },
) => ReactElement | null;

(InputSelectOption as { displayName?: string }).displayName = 'InputSelectOption';

export { inputSelectOptionClasses } from './classes';
export { InputSelectOption };
export default InputSelectOption;
