import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { chipClasses } from './classes';
import { SChip } from './styles';
import { TChipProps } from './types';

const Chip = forwardRef<HTMLButtonElement, TChipProps>(
  (
    {
      children,
      variant = 'solid',
      size = 'md',
      color = 'primary',
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
        size={size}
        color={color}
        rounded={rounded}
        {...props}
        className={mergeClasses(
          chipClasses.root,
          className,
        )}
      >
        {children}
      </SChip>
    );
  },
);

Chip.displayName = 'Chip';

export { chipClasses } from './classes';
export { Chip };
export default Chip;
