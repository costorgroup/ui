import React, { forwardRef } from "react";
import { mergeClasses } from "../../helpers/generate-utility-classes";
import { switchClasses } from "./classes";
import { FormControl } from "../form-control";
import { InputSwitch } from "../input/input-switch";
import { TSwitchProps } from "./types";
import { mergeSlotProps } from "../../helpers/slot-props";

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
      slotProps,
      ...props
    },
    ref,
  ) => {
    return (
      <FormControl
        {...slotProps?.root}
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
          slotProps?.root?.className,
          className,
        )}
        slotProps={slotProps}
      >
        <InputSwitch
          {...mergeSlotProps({ ref, ...props }, slotProps?.input)}
          slotProps={slotProps}
        />
      </FormControl>
    );
  },
);

Switch.displayName = "Switch";

export type {
  TSwitchProps,
  TSwitchSlotProps,
  TSwitchDirection,
} from "./types";
export { switchClasses } from "./classes";
export { Switch };
export default Switch;
