import React, { forwardRef, useId } from "react";
import { useTheme } from "@emotion/react";
import { mergeClasses } from "../../helpers/generate-utility-classes";
import { switchClasses } from "./classes";
import { InputFieldLayout } from "../input/input-base";
import { InputHelperText } from "../input/input-helper-text";
import { Text } from "../text";
import { inputDescriptionTextSize } from "../input/input-description-text-size";
import { InputLabel } from "../input/input-label";
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
      variant = "subtle",
      color = "primary",
      id,
      className,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const tone = error ? "error" : color;
    const theme = useTheme();
    const captionColor = theme.palette.default.main;

    return (
      <InputFieldLayout
        fullWidth={fullWidth}
        direction={direction}
        align="flex-start"
        label={
          label != null ? (
            <InputLabel
              htmlFor={fieldId}
              size={size}
              style={{ lineHeight: 1, color: captionColor }}
            >
              {label}
            </InputLabel>
          ) : null
        }
        description={
          description != null ? (
            <Text size={inputDescriptionTextSize[size]}>{description}</Text>
          ) : null
        }
        helperText={
          helperText != null ? (
            <InputHelperText
              size={size}
              color={tone}
              style={{ color: captionColor }}
            >
              {helperText}
            </InputHelperText>
          ) : null
        }
      >
        <InputSwitch
          ref={ref}
          id={fieldId}
          size={size}
          variant={variant}
          color={tone}
          aria-invalid={error || undefined}
          {...props}
          className={mergeClasses(
            switchClasses.root,
            error && switchClasses.error,
            className,
          )}
        />
      </InputFieldLayout>
    );
  },
);

Switch.displayName = "Switch";

export type { TSwitchProps, TSwitchDirection } from "./types";
export { switchClasses } from "./classes";
export { Switch };
export default Switch;

