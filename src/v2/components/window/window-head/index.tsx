import React, { forwardRef } from 'react';
import { IconButton } from '../../../../components/icon-button';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { CloseIcon } from '../../../../icons';
import { windowHeadClasses } from './classes';
import { SWindowHead, SWindowHeadClose, SWindowHeadContent } from './styles';
import { TWindowHeadProps } from './types';

const WindowHead = forwardRef<HTMLDivElement, TWindowHeadProps>(
  ({ children, onClose, className, ...props }, ref) => {
    return (
      <SWindowHead
        ref={ref}
        {...props}
        className={mergeClasses(windowHeadClasses.root, className)}
      >
        {children != null ? (
          <SWindowHeadContent>{children}</SWindowHeadContent>
        ) : (
          <SWindowHeadContent />
        )}
        {onClose != null ? (
          <SWindowHeadClose>
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
          </SWindowHeadClose>
        ) : null}
      </SWindowHead>
    );
  },
);

WindowHead.displayName = 'WindowHead';

export type { TWindowHeadProps };
export { windowHeadClasses } from './classes';
export { WindowHead };
export default WindowHead;
