import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { statusClasses } from './classes';
import { SStatus, SStatusDot } from './styles';
import { TStatusProps } from './types';
import { mergeSlotProps } from '../../helpers/slot-props';

const Status = forwardRef<HTMLSpanElement, TStatusProps>(
  (
    {
      color = 'success',
      size = 'md',
      pulse = false,
      className,
      slotProps,
      ...props
    },
    ref,
  ) => {
    const styleProps = { color, size, pulse };
    const labelled = Boolean(props['aria-label'] || props['aria-labelledby']);

    return (
      <SStatus
        ref={ref}
        role={labelled ? 'img' : undefined}
        aria-hidden={labelled ? undefined : true}
        {...styleProps}
        {...props}
        className={mergeClasses(statusClasses.root, className)}
      >
        <SStatusDot
          {...mergeSlotProps(
            {
              ...styleProps,
              className: mergeClasses(
                statusClasses.dot,
                pulse && statusClasses.pulse,
              ),
            },
            slotProps?.dot,
          )}
        />
      </SStatus>
    );
  },
);

Status.displayName = 'Status';

export type { TStatusProps, TStatusSlotProps, TStatusSize } from './types';
export { statusClasses } from './classes';
export { Status };
export default Status;
