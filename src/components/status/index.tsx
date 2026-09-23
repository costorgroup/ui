import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { statusClasses } from './classes';
import { SStatus, SStatusDot } from './styles';
import { TStatusProps } from './types';

const Status = forwardRef<HTMLSpanElement, TStatusProps>(
  (
    { color = 'success', size = 'md', pulse = false, className, ...props },
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
          {...styleProps}
          className={mergeClasses(
            statusClasses.dot,
            pulse && statusClasses.pulse,
          )}
        />
      </SStatus>
    );
  },
);

Status.displayName = 'Status';

export type { TStatusProps, TStatusSize } from './types';
export { statusClasses } from './classes';
export { Status };
export default Status;
