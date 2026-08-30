import React, {
  CSSProperties,
  forwardRef,
  useEffect,
  useId,
  useState,
} from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { flipbookClasses } from './classes';
import { FlipbookPage } from './flipbook-page';
import { loadPdfPages } from './load-pdf-pages';
import {
  SFlipbook,
  SFlipbookMessage,
  SFlipbookPdfPage,
  SFlipbookShell,
} from './styles';
import { TFlipbookProps } from './types';

const toCssSize = (value: number | string) =>
  typeof value === 'number' ? `${value}px` : value;

const Flipbook = forwardRef<HTMLDivElement, TFlipbookProps>(
  (
    {
      children,
      src,
      workerSrc,
      pdfScale = 1.5,
      className,
      width = 720,
      height = 560,
      style,
      ...props
    },
    ref,
  ) => {
    const reactId = useId();
    const [pdfState, setPdfState] = useState<{
      src: string;
      pages: string[];
      error: string | null;
      loading: boolean;
    }>({
      src: '',
      pages: [],
      error: null,
      loading: false,
    });

    useEffect(() => {
      if (!src) {
        setPdfState({
          src: '',
          pages: [],
          error: null,
          loading: false,
        });
        return;
      }

      const controller = new AbortController();

      setPdfState({
        src,
        pages: [],
        error: null,
        loading: true,
      });

      loadPdfPages(src, {
        workerSrc,
        scale: pdfScale,
        signal: controller.signal,
      })
        .then((pages) => {
          if (controller.signal.aborted) {
            return;
          }

          setPdfState({
            src,
            pages,
            error: null,
            loading: false,
          });
        })
        .catch((error: unknown) => {
          if (controller.signal.aborted) {
            return;
          }

          const message =
            error instanceof Error
              ? error.message
              : 'Failed to load PDF document.';

          setPdfState({
            src,
            pages: [],
            error: message,
            loading: false,
          });
        });

      return () => {
        controller.abort();
      };
    }, [pdfScale, src, workerSrc]);

    const shellStyle = {
      ...style,
      ['--cui-flipbook-width' as string]: toCssSize(width),
    } as CSSProperties;

    if (src) {
      if (pdfState.loading || (pdfState.src !== src && !pdfState.error)) {
        return (
          <SFlipbookShell
            ref={ref}
            style={shellStyle}
            className={mergeClasses(
              flipbookClasses.root,
              flipbookClasses.loading,
              className,
            )}
          >
            <SFlipbookMessage>Loading document…</SFlipbookMessage>
          </SFlipbookShell>
        );
      }

      if (pdfState.error) {
        return (
          <SFlipbookShell
            ref={ref}
            style={shellStyle}
            className={mergeClasses(
              flipbookClasses.root,
              flipbookClasses.error,
              className,
            )}
          >
            <SFlipbookMessage>{pdfState.error}</SFlipbookMessage>
          </SFlipbookShell>
        );
      }

      if (pdfState.pages.length === 0) {
        return (
          <SFlipbookShell
            ref={ref}
            style={shellStyle}
            className={mergeClasses(
              flipbookClasses.root,
              flipbookClasses.empty,
              className,
            )}
          >
            <SFlipbookMessage>This document has no pages.</SFlipbookMessage>
          </SFlipbookShell>
        );
      }

      return (
        <SFlipbook
          ref={ref}
          width={width}
          height={height}
          style={style}
          {...props}
          className={mergeClasses(flipbookClasses.root, className)}
        >
          {pdfState.pages.map((pageSrc, index) => (
            <FlipbookPage key={`${reactId}-pdf-${index}`} hard={index === 0}>
              <SFlipbookPdfPage
                src={pageSrc}
                alt={`Page ${index + 1}`}
                draggable={false}
              />
            </FlipbookPage>
          ))}
        </SFlipbook>
      );
    }

    if (children == null) {
      return (
        <SFlipbookShell
          ref={ref}
          style={shellStyle}
          className={mergeClasses(
            flipbookClasses.root,
            flipbookClasses.empty,
            className,
          )}
        >
          <SFlipbookMessage>
            Add FlipbookPage children or pass a document src.
          </SFlipbookMessage>
        </SFlipbookShell>
      );
    }

    return (
      <SFlipbook
        ref={ref}
        width={width}
        height={height}
        style={style}
        {...props}
        className={mergeClasses(flipbookClasses.root, className)}
      >
        {children}
      </SFlipbook>
    );
  },
);

Flipbook.displayName = 'Flipbook';

export type { TFlipbookProps, TFlipbookHandle } from './types';
export { flipbookClasses } from './classes';
export { Flipbook };
export { FlipbookBase } from './flipbook-base';
export { FlipbookPage } from './flipbook-page';
export { loadPdfPages } from './load-pdf-pages';
export default Flipbook;
