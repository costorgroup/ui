import React, {
  Children,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { ArrowRightIcon } from '../../../icons';
import { IconButton } from '../../icon-button';
import { FlipbookPage } from '../flipbook-page';
import { flipbookBaseClasses } from './classes';
import { FlipbookContext } from './context';
import {
  SFlipbookBase,
  SFlipbookBook,
  SFlipbookControls,
  SFlipbookStage,
  SFlipbookStatus,
} from './styles';
import { TFlipbookBaseProps, TFlipbookHandle } from './types';

const PrevIcon = () => (
  <span
    aria-hidden
    style={{ display: 'inline-flex', transform: 'scaleX(-1)' }}
  >
    <ArrowRightIcon width="1em" height="1em" />
  </span>
);

const isFlipbookPage = (child: React.ReactNode) =>
  isValidElement(child) &&
  (child.type === FlipbookPage ||
    (typeof child.type !== 'string' &&
      'displayName' in child.type &&
      child.type.displayName === 'FlipbookPage'));

const FlipbookBase = forwardRef<HTMLDivElement, TFlipbookBaseProps>(
  (
    {
      children,
      page: pageProp,
      defaultPage = 0,
      onPageChange,
  width = 720,
  height = 560,
      flippingTime = 700,
      showControls = true,
      showCover = true,
      flipbookRef,
      className,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const pages = useMemo(() => {
      const items: React.ReactElement[] = [];

      Children.forEach(children, (child, index) => {
        if (child == null || child === false) {
          return;
        }

        if (isFlipbookPage(child) && isValidElement(child)) {
          items.push(
            React.cloneElement(child, {
              key: child.key ?? index,
            }),
          );
          return;
        }

        items.push(
          <FlipbookPage key={index} hard={showCover && index === 0}>
            {child}
          </FlipbookPage>,
        );
      });

      return items;
    }, [children, showCover]);

    const pageCount = pages.length;
    const isControlled = pageProp !== undefined;
    const [uncontrolledPage, setUncontrolledPage] = useState(() =>
      Math.min(Math.max(defaultPage, 0), Math.max(pageCount - 1, 0)),
    );
    const [flipping, setFlipping] = useState(false);
    const [animatingPage, setAnimatingPage] = useState<number | null>(null);
    const dragStartX = useRef<number | null>(null);
    const flipTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
      undefined,
    );

    const page = isControlled
      ? Math.min(Math.max(pageProp ?? 0, 0), Math.max(pageCount - 1, 0))
      : uncontrolledPage;

    useEffect(() => {
      if (!isControlled) {
        setUncontrolledPage((current) =>
          Math.min(current, Math.max(pageCount - 1, 0)),
        );
      }
    }, [isControlled, pageCount]);

    useEffect(
      () => () => {
        if (flipTimer.current) {
          clearTimeout(flipTimer.current);
        }
      },
      [],
    );

    const setPage = useCallback(
      (nextPage: number) => {
        const clamped = Math.min(
          Math.max(nextPage, 0),
          Math.max(pageCount - 1, 0),
        );

        if (clamped === page || flipping || pageCount === 0) {
          return;
        }

        const animate = Math.abs(clamped - page) === 1;

        if (animate) {
          setFlipping(true);
          setAnimatingPage(Math.min(page, clamped));
        }

        if (!isControlled) {
          setUncontrolledPage(clamped);
        }

        onPageChange?.(clamped);

        if (animate) {
          flipTimer.current = setTimeout(() => {
            setFlipping(false);
            setAnimatingPage(null);
          }, flippingTime);
        }
      },
      [flipping, flippingTime, isControlled, onPageChange, page, pageCount],
    );

    const next = useCallback(() => {
      setPage(page + 1);
    }, [page, setPage]);

    const prev = useCallback(() => {
      setPage(page - 1);
    }, [page, setPage]);

    const goTo = useCallback(
      (nextPage: number) => {
        setPage(nextPage);
      },
      [setPage],
    );

    useImperativeHandle(
      flipbookRef,
      (): TFlipbookHandle => ({
        next,
        prev,
        goTo,
        getPage: () => page,
        getPageCount: () => pageCount,
      }),
      [goTo, next, page, pageCount, prev],
    );

    const contextValue = useMemo(
      () => ({
        page,
        pageCount,
        flipping,
        canPrev: page > 0 && !flipping,
        canNext: page < pageCount - 1 && !flipping,
        next,
        prev,
        goTo,
        flippingTime,
        showControls,
      }),
      [
        flipping,
        flippingTime,
        goTo,
        next,
        page,
        pageCount,
        prev,
        showControls,
      ],
    );

    const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) {
        return;
      }

      dragStartX.current = event.clientX;
    };

    const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
      if (dragStartX.current == null || flipping) {
        dragStartX.current = null;
        return;
      }

      const delta = event.clientX - dragStartX.current;
      dragStartX.current = null;

      if (Math.abs(delta) < 40) {
        const rect = event.currentTarget.getBoundingClientRect();
        const ratio = (event.clientX - rect.left) / rect.width;

        if (ratio > 0.55) {
          next();
        } else if (ratio < 0.45) {
          prev();
        }

        return;
      }

      if (delta < 0) {
        next();
      } else {
        prev();
      }
    };

    return (
      <FlipbookContext.Provider value={contextValue}>
        <SFlipbookBase
          ref={ref}
          bookWidth={width}
          bookHeight={height}
          flippingTime={flippingTime}
          tabIndex={0}
          role="region"
          aria-roledescription="flipbook"
          aria-label="Flipbook"
          {...props}
          className={mergeClasses(flipbookBaseClasses.root, className)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight' || event.key === 'PageDown') {
              event.preventDefault();
              next();
            } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
              event.preventDefault();
              prev();
            } else if (event.key === 'Home') {
              event.preventDefault();
              goTo(0);
            } else if (event.key === 'End') {
              event.preventDefault();
              goTo(pageCount - 1);
            }

            onKeyDown?.(event);
          }}
        >
          <SFlipbookStage className={flipbookBaseClasses.stage}>
            <SFlipbookBook
              className={flipbookBaseClasses.book}
              opened={page > 0}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
            >
              {pages.map((child, index) => {
                const flipped = index < page;
                const isFlippingSheet =
                  flipping && animatingPage != null && index === animatingPage;
                const zIndex = flipped
                  ? index
                  : pageCount - index + (isFlippingSheet ? pageCount : 0);

                return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
                  'data-page': index,
                  'aria-hidden': index !== page,
                  flipped,
                  zIndex,
                  isFlipping: flipping,
                });
              })}
            </SFlipbookBook>
          </SFlipbookStage>

          {showControls && pageCount > 0 ? (
            <SFlipbookControls className={flipbookBaseClasses.controls}>
              <IconButton
                type="button"
                size="sm"
                variant="subtle"
                color="base"
                aria-label="Previous page"
                disabled={!contextValue.canPrev}
                className={flipbookBaseClasses.action}
                onClick={prev}
              >
                <PrevIcon />
              </IconButton>
              <SFlipbookStatus className={flipbookBaseClasses.status}>
                {page + 1} / {pageCount}
              </SFlipbookStatus>
              <IconButton
                type="button"
                size="sm"
                variant="subtle"
                color="base"
                aria-label="Next page"
                disabled={!contextValue.canNext}
                className={flipbookBaseClasses.action}
                onClick={next}
              >
                <ArrowRightIcon width="1em" height="1em" />
              </IconButton>
            </SFlipbookControls>
          ) : null}
        </SFlipbookBase>
      </FlipbookContext.Provider>
    );
  },
);

FlipbookBase.displayName = 'FlipbookBase';

export type { TFlipbookBaseProps, TFlipbookHandle } from './types';
export { FlipbookContext } from './context';
export { flipbookBaseClasses } from './classes';
export { FlipbookBase };
export default FlipbookBase;
