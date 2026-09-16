import React, { forwardRef } from 'react';
import { IconButton } from '../../../../components/icon-button';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { CloseIcon } from '../../../../icons';
import { windowHeaderClasses } from './classes';
import { SWindowHeader, SWindowHeaderClose, SWindowHeaderContent } from './styles';
import { TWindowHeaderProps } from './types';

const WindowHeader = forwardRef<HTMLDivElement, TWindowHeaderProps>(
  ({ children, onClose, className, ...props }, ref) => {
    return (
      <SWindowHeader
        ref={ref}
        {...props}
        className={mergeClasses(windowHeaderClasses.root, className)}
      >
        {children != null ? (
          <SWindowHeaderContent>{children}</SWindowHeaderContent>
        ) : (
          <SWindowHeaderContent />
        )}
        {onClose != null ? (
          <SWindowHeaderClose>
            <IconButton
              type="button"
              variant="ghost"
              color="default"
              size="lg"
              rounded
              aria-label="Close"
              onClick={onClose}
            >
              <CloseIcon width="1em" height="1em" />
            </IconButton>
          </SWindowHeaderClose>
        ) : null}
      </SWindowHeader>
    );
  },
);

WindowHeader.displayName = 'WindowHeader';

export type { TWindowHeaderProps };
export { windowHeaderClasses } from './classes';
export { WindowHeader };
export default WindowHeader;
