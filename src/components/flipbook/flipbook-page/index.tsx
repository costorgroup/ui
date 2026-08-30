import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { flipbookPageClasses } from './classes';
import {
  SFlipbookPage,
  SFlipbookPageBack,
  SFlipbookPageFront,
} from './styles';
import { TFlipbookPageProps } from './types';

type TFlipbookPageInternalProps = TFlipbookPageProps & {
  flipped?: boolean;
  zIndex?: number;
  isFlipping?: boolean;
};

const FlipbookPage = forwardRef<HTMLDivElement, TFlipbookPageInternalProps>(
  (
    {
      children,
      hard = false,
      flipped = false,
      zIndex = 0,
      isFlipping = false,
      className,
      onClick,
      ...props
    },
    ref,
  ) => {
    return (
      <SFlipbookPage
        ref={ref}
        role="group"
        aria-roledescription="page"
        hard={hard}
        flipped={flipped}
        zIndex={zIndex}
        isFlipping={isFlipping}
        tabIndex={flipped ? -1 : 0}
        {...props}
        className={mergeClasses(
          flipbookPageClasses.root,
          hard && flipbookPageClasses.hard,
          flipped && 'Cui-selected',
          className,
        )}
        onClick={(event) => {
          onClick?.(event);
        }}
      >
        <SFlipbookPageFront className={flipbookPageClasses.front}>
          {children}
        </SFlipbookPageFront>
        <SFlipbookPageBack className={flipbookPageClasses.back} aria-hidden />
      </SFlipbookPage>
    );
  },
);

FlipbookPage.displayName = 'FlipbookPage';

export type { TFlipbookPageProps } from './types';
export { flipbookPageClasses } from './classes';
export { FlipbookPage };
export default FlipbookPage;
