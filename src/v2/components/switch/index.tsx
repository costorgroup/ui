import React, { forwardRef } from "react";
import { mergeClasses } from "../../../helpers/generate-utility-classes";
import { switchClasses } from "./classes";
import { FormControl } from "../form-control";
import { InputSwitch } from "../input/input-switch";
import { TSwitchProps } from "./types";

const Switch = forwardRef<HTMLInputElement, TSwitchProps>(
  (
    {
      label,
      description,
      helperText,
      error = false,
      fullWidth = true,
      direction = "ltr",
      size = "md",
      variant = "surface",
      color = "primary",
      id,
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <FormControl
        label={label}
        description={description}
        helperText={helperText}
        error={error}
        fullWidth={fullWidth}
        direction={direction}
        size={size}
        variant={variant}
        color={color}
        disabled={disabled}
        id={id}
        className={mergeClasses(
          switchClasses.root,
          error && switchClasses.error,
          className,
        )}
      >
        <InputSwitch ref={ref} {...props} />
      </FormControl>
    );
  },
);

Switch.displayName = "Switch";

export type { TSwitchProps, TSwitchDirection } from "./types";
export { switchClasses } from "./classes";
export { Switch };
export default Switch;
