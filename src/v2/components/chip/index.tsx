import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { chipClasses } from './classes';
import { SChip } from './styles';
import { TChipProps } from './types';

const Chip = forwardRef<HTMLButtonElement, TChipProps>(
  (
    {
      children,
      variant = 'solid',
      appearance = 'opaque',
      size = 'md',
      color = 'default',
      rounded = false,
      type = 'button',
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <SChip
        ref={ref}
        type={type}
        variant={variant}
        appearance={appearance}
        size={size}
        color={color}
        rounded={rounded}
        {...props}
        className={mergeClasses(chipClasses.root, className)}
      >
        {children}
      </SChip>
    );
  },
);

Chip.displayName = 'Chip';

export type { TChipProps, TChipVariant, TChipAppearance, TChipSize } from './types';
export { chipClasses } from './classes';
export { Chip };
export default Chip;
